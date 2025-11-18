const express = require('express');
const Order = require('../models/Order');
let Product;
try { Product = require('../models/Product'); } catch (e) { Product = null; }
const router = express.Router();

// In-memory fallback store when SKIP_DB=true
const inMemoryOrders = [];
let nextInMemoryId = 1;

// POST /api/orders - create an order
router.post('/', async (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'No items in order' });

    let total = 0;
    // Normalize items: try to resolve product reference, otherwise store provided snapshot
    const normalizedItems = await Promise.all(items.map(async it => {
      let price = it.price || 0;
      let title = it.title || '';
      let productRef = null;
      if (it.product && Product) {
        try {
          const product = await Product.findById(it.product);
          if (product) {
            productRef = product._id;
            price = product.price;
            title = product.title || title;
          }
        } catch (e) {
          // ignore lookup errors and fall back to provided snapshot
        }
      }
      total += price * (it.quantity || 1);
      return { product: productRef, title, quantity: it.quantity || 1, price };
    }));

    if (process.env.SKIP_DB === 'true') {
      // store into in-memory array and return a mock object
      const mock = {
        _id: (nextInMemoryId++).toString(),
        items: normalizedItems,
        customer,
        total,
        status: 'pending',
        createdAt: new Date()
      };
      inMemoryOrders.push(mock);
      return res.status(201).json(mock);
    }

    const order = new Order({ items: normalizedItems, customer, total });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders - list (basic)
router.get('/', async (req, res) => {
  try {
    if (process.env.SKIP_DB === 'true') {
      return res.json(inMemoryOrders.slice(-100));
    }
    const orders = await Order.find().populate('items.product').limit(100);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

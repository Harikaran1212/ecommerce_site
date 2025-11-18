const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema({
  // product reference is optional — allow storing a snapshot when ref is not available
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  customer: {
    name: String,
    email: String,
    address: String
  },
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

async function seed() {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    const sample = [
      { title: 'Classic Tee', description: '100% cotton tee', price: 19.99, image: '/images/tee.jpg', category: 't-shirts' },
      { title: 'Denim Jacket', description: 'Stylish denim jacket', price: 79.99, image: '/images/jacket.jpg', category: 'jackets' },
      { title: 'Sneakers', description: 'Comfortable sneakers', price: 59.99, image: '/images/sneakers.jpg', category: 'shoes' }
    ];

    await Product.deleteMany({});
    const created = await Product.insertMany(sample);
    console.log('Inserted products:', created.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

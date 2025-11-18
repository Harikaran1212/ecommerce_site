const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

// basic healthcheck
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Connect to MongoDB and start server
async function start() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } else if (process.env.SKIP_DB === 'true') {
      console.warn('MONGO_URI not set; starting server without DB because SKIP_DB=true');
    } else {
      throw new Error('MONGO_URI not set in environment. Set MONGO_URI or set SKIP_DB=true to start without DB for local dev');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();

const express = require('express');
const router = express.Router();

router.get('/orders', async (req, res) => {
  try {
    const orders = [
      { id: 1, name: 'Order 1', price: 100 },
      { id: 2, name: 'Order 2', price: 200 },
      { id: 3, name: 'Order 3', price: 300 },
    ];
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;

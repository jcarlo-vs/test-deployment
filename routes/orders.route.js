const express = require('express');
const router = express.Router();

const orders = [
  { id: 1, name: 'Order 1', price: 100 },
  { id: 2, name: 'Order 2', price: 200 },
  { id: 3, name: 'Order 3', price: 300 },
];

router.get('/orders', async (req, res) => {
  try {
    logger.info('Fetching orders');
    res.status(200).json({ data: orders });
  } catch (error) {
    logger.error('Error fetching orders', { error: error.message });
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    logger.info(`Fetching order ${req.params.id}`);
    const order = orders.find((order) => order.id === parseInt(req.params.id));
    res.status(200).json({ data: order });
  } catch (error) {
    logger.error('Error fetching order', { error: error.message });
    res.status(500).json({ message: 'Error fetching order' });
  }
});

module.exports = router;

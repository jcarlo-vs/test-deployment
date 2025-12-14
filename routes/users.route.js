const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'John Smith' },
];

router.get('/users', async (req, res) => {
  try {
    res
      .status(200)
      .json({ data: users, message: 'Users fetched successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error fetching users', error: error?.message });
  }
});

module.exports = router;

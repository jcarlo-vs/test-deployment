const express = require('express');
const ordersRoute = require('./orders.route');
const usersRoute = require('./users.route');

const router = express.Router();
router.use('/', ordersRoute);
router.use('/', usersRoute);

module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController')

router.get('/', (req, res) => {
  res.status(200).send('payment');
});

router.post('/charge', paymentController.charge);

module.exports = router;

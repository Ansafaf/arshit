const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove/:productId', cartController.removeFromCart);
router.get('/checkout', cartController.getCheckout);
router.post('/place-order', cartController.placeOrder);

module.exports = router;

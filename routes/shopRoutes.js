const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getHome);
router.get('/refund-policy', shopController.getRefundPolicy);
router.get('/terms-conditions', shopController.getTermsConditions);

module.exports = router;

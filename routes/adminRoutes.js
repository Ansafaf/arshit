const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Auth Routes
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.post('/logout', isAdmin, adminController.postLogout);

// Dashboard
router.get('/dashboard', isAdmin, adminController.getDashboard);

// Product Routes
router.get('/products/add', isAdmin, adminController.getAddProduct);
router.post('/products/add', isAdmin, upload.single('image'), adminController.postAddProduct);

router.get('/products/edit/:productId', isAdmin, adminController.getEditProduct);
router.post('/products/edit', isAdmin, upload.single('image'), adminController.postEditProduct);

router.post('/products/delete', isAdmin, adminController.postDeleteProduct);

module.exports = router;

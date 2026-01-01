const Product = require('../models/Product');

// Auth
exports.getLogin = (req, res) => {
    res.render('admin/login', {
        pageTitle: 'Admin Login',
        errorMessage: null
    });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        if (username === adminUsername && password === adminPassword) {
            req.session.isAdmin = true;
            req.session.admin = { username: adminUsername };
            return req.session.save(err => {
                res.redirect('/admin/dashboard');
            });
        }

        res.render('admin/login', {
            pageTitle: 'Admin Login',
            errorMessage: 'Invalid username or password'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/login');
    }
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect('/');
    });
};

// Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('admin/dashboard', {
            pageTitle: 'Admin Dashboard',
            products: products
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

// Products
exports.getAddProduct = (req, res) => {
    res.render('admin/addProduct', {
        pageTitle: 'Add Product',
        editing: false
    });
};

exports.postAddProduct = async (req, res) => {
    const { name, price, description, category, isFeatured } = req.body;
    const image = req.file;

    if (!image) {
        return res.render('admin/addProduct', {
            pageTitle: 'Add Product',
            editing: false,
            errorMessage: 'Attached file is not an image.'
        });
    }

    const imageUrl = '/uploads/' + image.filename;

    try {
        const product = new Product({
            name,
            price,
            description,
            image: imageUrl,
            category,
            isFeatured: isFeatured === 'on'
        });
        await product.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/products/add');
    }
};

exports.getEditProduct = async (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/editProduct', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.postEditProduct = async (req, res) => {
    const prodId = req.body.productId;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedCategory = req.body.category;
    const updatedIsFeatured = req.body.isFeatured === 'on';
    const image = req.file;

    try {
        const product = await Product.findById(prodId);
        product.name = updatedName;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.category = updatedCategory;
        product.isFeatured = updatedIsFeatured;

        if (image) {
            product.image = '/uploads/' + image.filename;
        }

        await product.save();
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.postDeleteProduct = async (req, res) => {
    const prodId = req.body.productId;
    try {
        await Product.findByIdAndDelete(prodId);
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

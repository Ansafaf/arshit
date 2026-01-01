const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const productId = req.body.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const existingItem = req.session.cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                productId: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    res.render('cart', {
        cart: cart,
        total: total
    });
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.productId;
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    }
    res.redirect('/cart');
};

exports.updateQuantity = (req, res) => {
    const productId = req.body.productId;
    const action = req.body.action; // 'inc' or 'dec'

    if (req.session.cart) {
        const item = req.session.cart.find(item => item.productId === productId);
        if (item) {
            if (action === 'inc') {
                item.quantity += 1;
            } else if (action === 'dec' && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    }
    res.redirect('/cart');
};

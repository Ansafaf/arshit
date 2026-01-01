const Product = require('../models/Product');

exports.getHome = async (req, res) => {
    try {
        const products = await Product.find().limit(12);
        const featuredProducts = await Product.find({ isFeatured: true }).limit(3);

        res.render('index', {
            products: products,
            featuredProducts: featuredProducts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

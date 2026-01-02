const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // Featured Products
    {
        name: 'Solo G Jacket',
        price: 9999,
        category: 'Ladies',
        image: '/assets/images/product-3.png',
        isFeatured: true
    },
    {
        name: 'Clean Plain Polo',
        price: 1299,
        category: 'Gents',
        image: '/assets/images/product-11.png',
        isFeatured: true
    },
    {
        name: 'Black Swan Shirt',
        price: 2499,
        category: 'Ladies',
        image: '/assets/images/product-7.png',
        isFeatured: true
    },
    // Main Collection
    {
        name: 'Classic White Shirt',
        price: 999,
        category: 'Fashion',
        image: '/assets/images/product-1.png'
    },
    {
        name: 'Floral Evening Dress',
        price: 1899,
        category: 'Ladies',
        image: '/assets/images/product-12.png'
    },
    {
        name: 'Urban Denim Jeans',
        price: 2499,
        category: 'Gents',
        image: '/assets/images/product-2.png'
    },
    {
        name: 'Vibrant Summer Top',
        price: 799,
        category: 'Ladies',
        image: '/assets/images/product-4.png'
    },
    {
        name: 'Cozy Knit Sweater',
        price: 1599,
        category: 'Winter',
        image: '/assets/images/product-5.png'
    },
    {
        name: 'Sleek Black Trousers',
        price: 1899,
        category: 'Gents',
        image: '/assets/images/product-6.png'
    },
    {
        name: 'Stylish Accessories Set',
        price: 499,
        category: 'Accessories',
        image: '/assets/images/product-8.png'
    },
    {
        name: 'Casual Streetwear Hoody',
        price: 1299,
        category: 'Unisex',
        image: '/assets/images/product-9.png'
    },
    {
        name: 'Elegant Silk Scarf',
        price: 899,
        category: 'Ladies',
        image: '/assets/images/product-10.png'
    }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aaliyah_ecommerce')
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Database seeded successfully with all products!');
        process.exit();
    })
    .catch(err => {
        console.error('Seeding error:', err);
        process.exit(1);
    });

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // Featured Products
    {
        name: 'Solo G Jacket',
        price: 120,
        category: 'Ladies',
        image: '/assets/images/product-3.png',
        isFeatured: true
    },
    {
        name: 'Clean Plain Polo',
        price: 259,
        category: 'Gents',
        image: '/assets/images/product-11.png',
        isFeatured: true
    },
    {
        name: 'Black Swan Shirt',
        price: 999,
        category: 'Ladies',
        image: '/assets/images/product-7.png',
        isFeatured: true
    },
    // Main Collection
    {
        name: 'Classic White Shirt',
        price: 120,
        category: 'Fashion',
        image: '/assets/images/product-1.png'
    },
    {
        name: 'Floral Evening Dress',
        price: 150,
        category: 'Ladies',
        image: '/assets/images/product-12.png'
    },
    {
        name: 'Urban Denim Jeans',
        price: 80,
        category: 'Gents',
        image: '/assets/images/product-2.png'
    },
    {
        name: 'Vibrant Summer Top',
        price: 45,
        category: 'Ladies',
        image: '/assets/images/product-4.png'
    },
    {
        name: 'Cozy Knit Sweater',
        price: 65,
        category: 'Winter',
        image: '/assets/images/product-5.png'
    },
    {
        name: 'Sleek Black Trousers',
        price: 55,
        category: 'Gents',
        image: '/assets/images/product-6.png'
    },
    {
        name: 'Stylish Accessories Set',
        price: 25,
        category: 'Accessories',
        image: '/assets/images/product-8.png'
    },
    {
        name: 'Casual Streetwear Hoody',
        price: 70,
        category: 'Unisex',
        image: '/assets/images/product-9.png'
    },
    {
        name: 'Elegant Silk Scarf',
        price: 30,
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

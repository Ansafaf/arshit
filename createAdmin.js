const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const path = require('path');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aaliyah_ecommerce';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'password';

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return mongoose.disconnect();
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = new Admin({
            username,
            password: hashedPassword
        });

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Username: ' + username);
        console.log('Password: ' + password);
        await mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
    });

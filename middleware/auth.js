const Admin = require('../models/Admin');

exports.isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    }
    return res.redirect('/admin/login');
};

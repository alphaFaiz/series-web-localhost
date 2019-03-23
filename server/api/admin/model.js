const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String},
    role: {type:String, default:'user'}
}, {
    timestamps: true,
});

const AdminModel = mongoose.model('User', adminSchema);
module.exports = AdminModel;
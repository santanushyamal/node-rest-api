const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String
});


module.exports = mongoose.model('User', userSchema);
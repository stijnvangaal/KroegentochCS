var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {type : String, required: true, unique: true, index: true },
    password: {type : String, required:true }
});

var User = mongoose.model('User', userSchema);
module.exports = User;

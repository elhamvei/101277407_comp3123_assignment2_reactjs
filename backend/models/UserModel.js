const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        maxlength: 100,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type : String,
        required: true,
        index: {
            unique: true
        },
        maxlength: 50,
        validate: [validateEmail, 'Please fill a valid email address']       
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("user", userSchema);
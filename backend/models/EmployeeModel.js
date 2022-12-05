const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 100,
        required: true,
    },
    last_name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type : String,
        required: true,
        index: {
            unique: true
        },
        maxlength: 50        
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ['Male', 'Female', 'Other' ],
        required: "Please set MALE, FEMALE or OTHER"
    },
    salary: {
        type: mongoose.Types.Decimal128,
        required: true,
    },

})

module.exports = mongoose.model("employee", employeeSchema);
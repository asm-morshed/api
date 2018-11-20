const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {type: String, required: true},
    mobileNumber: {type: String, required: true},
    nationalId: {type: String, required: true},
    region: {type: String, required: true},
    area: {type: String, required: true},
    territory: {type: String, required: true},
    address: {type: String, required: true},
    email: {
        type: String, required: true, unique:true,
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    otherPhoneNumber: {type: String, required: true},
    password: {type:String, required: true}
})

module.exports = mongoose.model('Employee',employeeSchema);
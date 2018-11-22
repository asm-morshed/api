const express = require('express')
const router = express.Router();

const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeSchema');
const Config = require('../config/keys');

const checkToken = require('../config/verify');

exports.employeeCreate=(req,res,next)=>{
    
    console.log(req.body);
    
    const employee = new Employee({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            nationalId: req.body.nationalId,
            region: req.body.region,
            area: req.body.area,
            territory: req.body.territory,
            address: req.body.address,
            email: req.body.email,
            otherPhoneNumber: req.body.otherPhoneNumber,
            password: req.body.password
    })
    const { email, password } = req.body;

    Employee.findOne({
        email
    }).then(user=>{
        if(user){
            return res.json({
                message: 'User email already exists'
            })
        }else{
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) console.log("Error during generating salt")
                else{
                    bcrypt.hash(employee.password,salt,(err,hash)=>{
                        if(err) console.log("Error during hasing password");
                        else{
                            employee.password = hash;
                            employee.save()
                                .then(user=>{
                                    res.send({
                                        user: user
                                    })
                                })
                                .catch(error=>{
                                    res.json({
                                        message: 'Error during registration'
                                    })
                                })
                        }
                    })
                }
            })
        }
    })      
    
}

exports.employeeLogin = (req,res,next)=>{
    // res.send(req.body)
    
        console.log("this is from server", req.body);
    
        const { email, password } = req.body;
        Employee.findOne({ email })
            .then(user => {
                //console.log("user: ", user);
    
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    })
                }
                //console.log(user);
    
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        console.log("comparing");
                        
                        if (isMatch) {
                            console.log("Is match");
                            
                            const payload = {
                                id: user._id,
                                email: user.email
                            }
                            jwt.sign(payload, Config.secretKey, { expiresIn: 3600 }, (err, token) => {
                                if (err) console.log("Error during login in jwt");
                                else {
                                    console.log("after login success");
                                    console.log(token);
                                    
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                        // message: 'Message  after login'
                                    })
                                }
    
                            })
                        }
                    })
            })
    
}
exports.changePassword = (req,res,next)=>{
    console.log(req.body);
    console.log("To see the token:  ",req.headers['authorization']);
    const header = req.headers['authorization'];
    console.log("Token::::",header);
    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmpassword;
    console.log("newPass: confirmPassword", newPassword,confirmPassword);
    
    if(newPassword === confirmPassword){

        if(header){
            console.log("Token exists");
            const bearer = header.split(' ')
            const token = bearer[1];
            const decoded = jwt.decode(token,Config.secretKey)
            console.log("Decoded value",decoded.email);
            const email = decoded.email;
            Employee.findOne({ email })
                .then(user => {
                    //console.log("user: ", user);
        
                    if (!user) {
                        return res.status(404).json({
                            message: 'User not found'
                        })
                    }
                    console.log(user);
                    //res.send(user)
                    user.password = newPassword;
                    user.save()
                        .then(result=>{
                            res.json({
                                result
                            })
                        })
                        .catch(error=>{
                            res.json({
                                message: 'Error during updating password'
                            })
                        })
                })
        
        
    }
}else{
    console.log("Password must be same");
    
}
   
}
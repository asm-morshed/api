const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employeeSchema');

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
    employee.save()
        .then(response=> res.status(201).json({
            message: response
        }))
        .catch(err=> res.send(err))
    
}

exports.employeeLogin = (req,res,next)=>{
    res.send(req.body)
    
}
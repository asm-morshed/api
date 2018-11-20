const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employeeSchema');


const employeeController = require('../controller/employeeController');


router.post('/createacount',employeeController.employeeCreate);
router.post('/userlogin',employeeController.employeeLogin)

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employeeSchema');

const checkToken = require('../config/verify');

const employeeController = require('../controller/employeeController');


router.post('/createacount',employeeController.employeeCreate);
router.post('/userlogin',employeeController.employeeLogin);
router.post('/changepassword',checkToken,employeeController.changePassword);

module.exports = router;
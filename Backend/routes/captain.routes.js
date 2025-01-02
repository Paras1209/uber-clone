const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register', [
    body('username').trim().isLength({min:3}).withMessage("username must be atleast 3 characters long"),
    body('email').trim().isEmail().withMessage("please enter a valid email address"),
    body('password').trim().isLength({min:5}).withMessage("password must be atleast 5 characters long"),
    body('vehicle.color').trim().isLength({min:3}).withMessage("color must be atleast 3 characters long"),
    body('vehicle.plate').trim().isLength({min:3}).withMessage("plate must be atleast 3 characters long"),
    body('vehicle.capacity').trim().isNumeric().withMessage("capacity must be a number"),
    body('vehicle.vehicleType').trim().isIn(["car","motorcycle","auto"]).withMessage("please provide a valid vehicle type"),
], captainController.registerCaptain);

module.exports = router;
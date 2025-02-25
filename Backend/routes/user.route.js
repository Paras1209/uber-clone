const express = require("express");
const router = express.Router();
const { body , validationResult } = require("express-validator")
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register' , [
    body("username").trim().isLength({min:3}).withMessage("username must be atleast 3 characters long"),
    body("email").trim().isEmail().withMessage("please enter a valid email address"),   
    body("password").trim().isLength({min:5}).withMessage("password must be atleast 5 characters long"),
] , userController.registerUser)

router.post('/login' , [
    body("email").trim().isEmail().withMessage("please enter a valid email address"),
    body("password").trim().isLength({min:5}).withMessage("password must be atleast 5 characters long"),
] , userController.loginUser)

router.get('/profile' , authMiddleware.authUser ,  userController.getProfile)

router.get('/logout' , authMiddleware.authUser , userController.logoutUser)

module.exports = router;
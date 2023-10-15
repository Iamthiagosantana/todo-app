const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/User')

const verifyLoginData = require("../utils/verifyLoginData");

const authRouter = express.Router();

const tokenVerificator = async (req, res, next) => {
    // Proceeds if the client has the token cookie, or if it's invalid. In case it's invalid, clear the cookie and then proceed.
    console.log("token verificator")
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err,) => {
            if (err) {
                // If the token exists but is invalid, it should be cleared and the user should be allowed to proceed with the authentication.

                res.clearCookie("token")

                return next();
            }
        })

        // If the token is valid, the user should be redirected to the todos page and not proceed with the authentication

        return res.status(401).json({redirectTo: '/todos'})
    }
    else {
        next()
    }
}


authRouter.post('/login', tokenVerificator, async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {

            return res.status(401).json({ message: "Wrong credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {

            return res.status(401).json({ message: "Wrong credentials" })
        }
        
        const payload = {_id: user._id, username: user.username}

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

        return res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000
        }).send("Cookie set");
    }
    catch (err) {

        res.status(500).json({message: "Internal server error."})
    }
    
})

authRouter.post('/register', tokenVerificator, async (req, res) => {
    try {
        const { username, password } = req.body

        if (!verifyLoginData(username, password)) {

            return res.status(422).json({message: "Credentials not in the correct format."});
        }

        const existingUser = await User.findOne({ username }, '-password')

        console.log("After finding...")

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = { username, password: hashedPassword}

        const newUser = await new User(userData).save()

        const data = {_id: newUser._id, username: newUser.username}

        const newToken = jwt.sign(data, process.env.SECRET, {expiresIn: '1h'})

        return res.cookie("token", newToken, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000
        }).send("Cookie set");

    }
    catch (err) {
        res.status(500).json({message: "Internal server error."})
    }
})

authRouter.post('/logoff', async (req, res) => {

    const token = req.cookies.token
    
    if (!token) {
        // The user is unauthorized, so they should be redirected to the login route.
        return res.status(401).json({message: "Already unauthenticated."});
    }

    // The user is authorized, therefore they should have their token cleared and get redirected to the login page.

    res.clearCookie("token").send("Cookie removed");
})

module.exports = authRouter
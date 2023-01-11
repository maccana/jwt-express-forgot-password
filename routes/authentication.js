const app = require('express');
const router = require('express').Router();
const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');
let postRegistrationLoginMsg = ''
let registerSuccess

// Middleware
const MW = require("../middleware/middleware.js");

// Register Route
router.get('/register', async (req, res) => {
    console.log('Getting registration form...')
    res.render('register.ejs')
});

function validateEmail(email) {
    // A simple regex for checking email format
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

router.post('/register', async (req, res) => {

    if (!req.body.email || !req.body.password) {
        console.log('hhhh')
        return res.status(400).json({ error: 'Email and password are required.' })
    }

    if (!validateEmail(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email address.' })
    }


    if (req.body.password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters.' })
    }


    const existingUser = await User.findOne({
        email: req.body.email
    });



    if (existingUser) {
        return res.status(400).send('Username is taken.');
    } else {
        let newUser = new User()
        console.log('User -> ', req.body)
        newUser.username = req.body.email
        newUser.password = req.body.password

        newUser.save().then(user => {
            postRegistrationLoginMsg = 'You have registered. Please login.'
            registerSuccess = true
            res.redirect('/api/login');
        })
    }
})

router.get('/check-auth', MW.isAuth, MW.otherMiddleware, function (req, res) {
    res.send({ mes: 'Auth passed' })
})

router.get('/login', (req, res) => {
    // TODO: css for msg show/hide depending on success or fail
    res.render('login.ejs', { msg: postRegistrationLoginMsg, status: registerSuccess })
})

router.post('/login', async (req, res) => {
    // Existing email check
    console.log('USER login: ', req.body)
    const existingUser = await User.findOne({
        username: req.body.email
    });
    console.log('USER from DB: ', existingUser)

    if (existingUser) {
        res.render('dash.ejs', { msg: 'Welcome back ', user: existingUser })
    } else {
        res.render('login.ejs', { msg: 'No account found with this email' })
    }
})

// TODO: Forgot Password
router.get('/forgot', async (req, res) => {
    res.render('forgot.ejs')
});

router.post('/forgot', async (req, res) => {
    res.render('forgot-confirm.ejs')
});

module.exports = router;
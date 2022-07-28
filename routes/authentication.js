const app = require('express');
const router = require('express').Router();
const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');
let postRegistrationLoginMsg = ''
let registerSuccess

// Register Route
router.get('/register', async (req, res) => {
    console.log('Getting registration form...')
    res.render('register.ejs')
});

router.post('/register', async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email
    });

    console.log('USER2: ', existingUser)

    if (existingUser) {
        return res.status(400).send('Username is taken.');
    } else {
        let newUser = new User()
        console.log('User -> ', req.body)
        newUser.username = req.body.email
        newUser.password = req.body.password

        console.log('U -> ', newUser)

        newUser.save().then(user => {
            postRegistrationLoginMsg = 'You have registered. Please login.'
            registerSuccess = true
            res.redirect('/api/login');
        })
    }
    // res.send('Post registration form route')
})

router.get('/login', (req, res) => {

    // TODO: create a way to pass css for msg depending on success or fail
    res.render('login.ejs', { msg: postRegistrationLoginMsg, status: registerSuccess })
})

router.post('/login', async (req, res) => {
    // Existing email check
    console.log('USER1: ', req.body)

    const existingUser = await User.findOne({
        email: req.body.username
    });
    console.log('USER2: ', existingUser)

    if (existingUser) {
        // return res.status(400).send('Username is taken.');
        res.render('dash.ejs', { msg: 'Welcome back ', user: existingUser })
    } else {
        res.render('login.ejs', { msg: 'No account found with this email' })
    }
})

// Forgot Password
router.get('/forgot', async (req, res) => {
    res.render('forgot.ejs')
});

router.post('/forgot', async (req, res) => {
    res.render('forgot-confirm.ejs')
});

module.exports = router;
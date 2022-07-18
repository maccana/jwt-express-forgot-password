const router = require('express').Router();
const Joi = require('joi');
const User = require('../models/User');
const mongoose = require('mongoose');

// Register Route
router.get('/register', async (req, res) => {
    console.log('Getting registration form...')
    res.send('Register form')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', async (req, res) => {
    // Existing email check
    console.log('USER: ', req.body)

    const existingUsername = await User.findOne({
        email: req.body.email
    });
    console.log('USER: ', existingUsername)

    if (existingUsername) {
        return res.status(400).send('Username is taken.');
    } else {
        res.render('dash.ejs')
    }
})

module.exports = router;
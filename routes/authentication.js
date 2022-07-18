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
    console.log('USER: ', User)

    // Existing email check
    const existingUsername = await User.findOne({
        name: req.body.name
    });
    if (existingUsername) return res.status(400).send('Username is taken.');
    res.render('dash.ejs')
})

module.exports = router;
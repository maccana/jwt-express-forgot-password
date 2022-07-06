const router = require('express').Router();

// Register Route
router.get('/register', async (req, res) => {
    console.log('Getting registration form...')
    res.send('Register form')
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

module.exports = router;
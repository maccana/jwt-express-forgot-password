const router = require('express').Router();

// Register Route
router.get('/register', async (req, res) => {
    console.log('Getting registration form...')
    res.send('Register form')
});

module.exports = router;
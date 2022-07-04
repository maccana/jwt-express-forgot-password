// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/authentication');
const port = 3010;

app.use('/auth', auth)

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});
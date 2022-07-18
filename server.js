// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/authentication');
config = require('./config/DB');
const port = 3010;

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json());
app.use(bodyParser.json())

mongoose.connect(config.DB).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);

app.use('/api', auth)

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});
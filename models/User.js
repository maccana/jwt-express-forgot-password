// User.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const now = new Date().getTime()

// Define collection and schema for Items
var User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
},
    { timestamps: true },
    {
        collection: 'users'
    });

module.exports = mongoose.model('User', User)

// server.js
const express = require('express');
const app = express();
const port = 3010;

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});
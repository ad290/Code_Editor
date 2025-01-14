const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

require('./db/conn');

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./router/auth'));

// Middleware to log URL
const consoleURL = (req, res, next) => {
    console.log(`User at URL: localhost:${PORT}${req.url}`);
    next();
};

// Deployment setup
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", consoleURL, (req, res) => {
        res.send("API is running..");
    });
}

// Default 404 handler for non-matching routes
app.use(consoleURL, (req, res) => {
    res.status(404).send(`
        <center>
            <h1>404</h1>
            <h3>The Page you are Looking for is Not Found</h3>
        </center>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at: localhost:${PORT}`);
});

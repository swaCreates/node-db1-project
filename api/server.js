const express = require("express");

const db = require("../data/dbConfig.js");

const welcome_router= require('../routers/welcome-router.js');

const server = express();

// built-in middleware
server.use(express.json());
// third party middleware
server.use(helmet());

// route handlers
server.use(welcome_router);

// when there is no router, handler
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// error, handler
server.use((err, req, res, next) => {
    console.log('Server error:', err)
	res.status(500).json({
		message: "Oops, something went wrong. Please try again later.",
	});
});

module.exports = server;

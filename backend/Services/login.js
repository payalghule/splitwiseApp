'use strict';
const express = require('express');
const router = express.Router();
const Users = require('../Models/UserModel');

router.post('/', (req, res) => {
	Users.findOne(
		{ email: req.body.email, password: req.body.password },
		(error, user) => {
			if (error) {
				res.writeHead(500, {
					'Content-Type': 'text/plain',
				});
				res.end('Error Occured');
			}
			if (user) {
				res.cookie('cookie', user.username, {
					maxAge: 900000,
					httpOnly: false,
					path: '/',
				});
				req.session.user = user;
				res.writeHead(200, {
					'Content-Type': 'text/plain',
				});
				res.end();
			} else {
				res.writeHead(401, {
					'Content-Type': 'text/plain',
				});
				res.end('Invalid Credentials');
			}
		}
	);
});

module.exports = router;

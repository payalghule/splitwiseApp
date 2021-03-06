"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
const { auth } = require("../passport");
const { secret } = require("../passconfig");

auth();
router.post("/", (req, res) => {
	kafka.make_request("login", req.body, (err, result) => {
		console.log("result is:", result);
		if (err) {
			console.log(err);
		} else {
			if (result === 500) {
				res.writeHead(500, {
					"Content-Type": "text/plain",
				});
				res.end("SERVER_ERROR");
			} else if (result === 207) {
				res.writeHead(207, {
					"Content-Type": "text/plain",
				});
				res.end("NO_USER");
			} else if (result === 209) {
				res.writeHead(209, {
					"Content-Type": "text/plain",
				});
				res.end("INCORRECT_PASSWORD");
			} else {
				const payload = { _id: result._id };
				const token = jwt.sign(payload, secret, {
					expiresIn: 1008000,
				});
				//req.session.user = result;
				result.token = "JWT " + token;
				// res.cookie("cookie", result.username, {
				// 	maxAge: 900000,
				// 	httpOnly: false,
				// 	path: "/",
				// });
				res.writeHead(200, {
					"Content-Type": "applicaton/json",
				});
				res.end(JSON.stringify(result));
			}
		}
	});
});
module.exports = router;

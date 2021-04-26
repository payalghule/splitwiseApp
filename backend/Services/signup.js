const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const jwt = require("jsonwebtoken");
const { auth } = require("../passport");
const { secret } = require("../passconfig");
auth();

//exports.UserSignUp = (req, res) =>
router.post("/", (req, res) => {
	kafka.make_request("signup", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 299) {
			res.writeHead(299, {
				"Content-Type": "text/plain",
			});
			res.end("EMAIL_EXIST");
		} else {
			const payload = { _id: result.userid };
			const token = jwt.sign(payload, secret, {
				expiresIn: 1008000,
			});
			result.token = "JWT " + token;
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});

module.exports = router;

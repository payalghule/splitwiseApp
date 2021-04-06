const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

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
		} else if (result === 200) {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end("USER_ADDED");
		}
	});
});

module.exports = router;

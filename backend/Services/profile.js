const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

// router.post("/updateuser", (req, res) => {
router.post("/updateuser", (req, res) => {
	console.log("inside user profile update");
	console.log("req.body", req.body);
	kafka.make_request("updateuser", req.body, (err, result) => {
		console.log("updated details:", result);
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
			res.end("SAVE_FAILED");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
router.post("/getuserprofile", (req, res) => {
	console.log("---------Backend:getuserprofile--------");
	kafka.make_request("getuserprofile", req.body, (err, result) => {
		console.log("user received in backend: ", result);
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 207) {
			res.writeHead(299, {
				"Content-Type": "text/plain",
			});
			res.end("No_USER");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
module.exports = router;

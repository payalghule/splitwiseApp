"use strict";
const express = require("express");
const router = express();
const kafka = require("../kafka/client");
router.post("/addcomment", async (req, res) => {
	console.log("---------In Backend: Add comment---------");
	console.log("req.body: ", req.body);
	kafka.make_request("addcomment", req.body, (err, results) => {
		console.log("addcomment details:", results);
		if (err) {
			console.log(err);
			res.writeHead(err.status, {
				"Content-Type": "text/plain",
			});
			res.end(err.data);
		} else if (results) {
			res.writeHead(results.status, {
				"Content-Type": "text/plain",
			});
			res.end(results.data);
		}
	});
});

router.post("/deletecomment", async (req, res) => {
	console.log("---------In Backend: Delete comment---------");
	console.log("req.body: ", req.body);

	kafka.make_request("deletecomment", req.body, (err, results) => {
		console.log("delete comment details:", results);
		if (err) {
			console.log(err);
			res.writeHead(err.status, {
				"Content-Type": "text/plain",
			});
			res.end(err.data);
		} else if (results) {
			res.writeHead(results.status, {
				"Content-Type": "text/plain",
			});
			res.end(results.data);
		}
	});
});

module.exports = router;

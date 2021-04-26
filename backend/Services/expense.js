"use strict";
const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const { checkAuth } = require("../passport");

router.post("/addexpense", checkAuth, async (req, res) => {
	console.log("inside addexpense  backend");
	console.log("req.body", req.body);
	kafka.make_request("addexpense", req.body, (err, results) => {
		console.log("addexpense details:", results);
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

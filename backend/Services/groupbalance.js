"use strict";
const express = require("express");
const router = express();
const kafka = require("../kafka/client");

router.post("/getgroupbalance", async (req, res) => {
	console.log("Backend :: inside getgroupBalance ::ShowGroups ");
	console.log("req.body :", req.body);
	kafka.make_request("getgroupbalance", req.body, (err, results) => {
		console.log("getgroupBalance:", results);
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

const express = require("express");
const router = express();
const kafka = require("../kafka/client");

router.post("/creategroup", (req, res) => {
	console.log("inside postmethod for create group backend");
	console.log("req.body", req.body);

	kafka.make_request("creategroup", req.body, (err, result) => {
		console.log("group details:", result);
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 299) {
			res.writeHead(299, {
				"Content-Type": "text/plain",
			});
			res.end("GROUP_EXISTS");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end("GROUP_ADDED");
		}
	});
});

router.get("/getallusers", (req, res) => {
	console.log("inside get User details create groups in node backend");
	kafka.make_request("getallusers", req.body, (err, result) => {
		console.log("user details:", result);
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 207) {
			res.writeHead(207, {
				"Content-Type": "text/plain",
			});
			res.end("NO_USER_DETAILS");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});

router.post("/getallgroups", (req, res) => {
	console.log("Backend :: inside getallgroups ::MyGroups ");
	console.log("req.body :", req.body);
	kafka.make_request("getallgroups", req.body, (err, result) => {
		console.log("group details:", result);
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 207) {
			res.writeHead(207, {
				"Content-Type": "text/plain",
			});
			res.end("NO_GROUPS");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});

router.get("/joingroup", (req, res) => {
	console.log("Backend :: inside joingroup ::MyGroups ");
	kafka.make_request("joingroup", req.body, (err, result) => {
		console.log("group details:", result);
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else if (result === 207) {
			res.writeHead(207, {
				"Content-Type": "text/plain",
			});
			res.end("NO_GROUP_PRESENT");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end("JOINED_GROUP");
		}
	});
});
module.exports = router;
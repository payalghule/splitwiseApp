const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const Balance = require("../Models/BalancesModel");
const Users = require("../Models/UserModel");

router.post("/getdashdata", async (req, res) => {
	console.log("Backend:: inside getdashdata");
	console.log("req.body :", req.body);
	kafka.make_request("getdashdata", req.body, (err, results) => {
		console.log("group details:", results);
		if (err) {
			console.log(err);
			res.writeHead(err.status, {
				"Content-Type": "text/plain",
			});
			res.end(err.data);
		} else {
			res.writeHead(results.status, {
				"Content-Type": "text/plain",
			});
			res.end(results.data);
		}
	});
});

module.exports = router;

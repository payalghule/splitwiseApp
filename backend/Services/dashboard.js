const express = require("express");
const router = express();
const kafka = require("../kafka/client");
//const { checkAuth } = require("../passport");

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

router.post("/settleup", (req, res) => {
	console.log("inside settle up backend");
	const settleWithUserId = req.body.settleWithUserId;
	const settlededById = req.body.settlededById;
	const settleUserAmt = req.body.settleUserAmt;
	console.log("settleWithUserId :", settleWithUserId);
	console.log("settlededById :", settlededById);
	console.log("settleUserAmt :", settleUserAmt);

	kafka.make_request("settleup", req.body, (err, results) => {
		console.log("recent activiy details:", results);
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

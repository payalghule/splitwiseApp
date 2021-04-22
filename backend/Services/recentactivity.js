const express = require("express");
const router = express();
const kafka = require("../kafka/client");
router.post("/getrecentactivity", async (req, res) => {
	console.log("Backend ::inside getrecentactivity");
	console.log("req body:", req.body);
	kafka.make_request("getrecentactivity", req.body, (err, results) => {
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

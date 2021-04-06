const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

// router.post("/updateuser", (req, res) => {
//   console.log("inside update");
//   console.log("received Data from client", req.body);

//   let sql = `CALL updateUser('${req.body.userid}','${req.body.email}','${req.body.username}','${req.body.phone}', '${req.body.currency}', '${req.body.timezone}','${req.body.language}');`;
//   db.query(sql, (err, result) => {
//     console.log("result is", result);
//     if (err) {
//       console.log(err);
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end("Error in Data");
//     }
//     if (result && result.length > 0 && result[0][0].status === "USER_UPDATED") {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(result[0][0].status);
//     } else if (
//       result &&
//       result.length > 0 &&
//       result[0][0].status === "NO_RECORD"
//     ) {
//       res.writeHead(401, {
//         "Content-Type": "text/plain",
//       });
//       res.end(result[0][0].status);
//     }
//   });
// });

router.post("/getuserprofile", (req, res) => {
	kafka.make_request("getuserprofile", req.body, (err, result) => {
		if (result === 500) {
			res.writeHead(500, {
				"Content-Type": "text/plain",
			});
			res.end("SERVER_ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end(JSON.stringify(result));
		}
	});
});
module.exports = router;

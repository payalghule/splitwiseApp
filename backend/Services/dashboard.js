const express = require("express");
const router = express();
const kafka = require("../kafka/client");
const Balance = require("../Models/BalancesModel");
const Users = require("../Models/UserModel");

router.post("/getdashdata", async (req, res) => {
	console.log("inside getdashdata  backend");
	let dashData = { youOwe: [], youAreOwed: [] };

	let payableData = await Balance.find(
		{ payableTo: req.body.userid },
		{ _id: 0 }
	);
	console.log("payableData is: ", payableData);
	if (payableData && payableData.length > 0) {
		for (let i = 0; i < payableData.length; i++) {
			await payableData[i].populate("borrower").execPopulate();
			//let payableToUser = await Users.findById(payableData[i].payableTo);
			let borrowerUser = await Users.findById(payableData[i].borrower);
			console.log("borrower is: ,", borrowerUser.username);
			console.log("payableData[i].pendingAmt: ", payableData[i].pendingAmt);
			if (payableData[i].pendingAmt > 0) {
				let dashObj = {
					borrower: borrowerUser.username,
					pendingAmt: payableData[i].pendingAmt,
				};
				dashData.youAreOwed.push(dashObj);
			} else if (payableData[i].pendingAmt < 0) {
				let dashObj = {
					payableTo: borrowerUser.username,
					pendingAmt: Math.abs(payableData[i].pendingAmt),
				};
				dashData.youOwe.push(dashObj);
			}
			console.log("dashData after first query :", dashData);
		}
	}

	let borrowerData = await Balance.find(
		{ borrower: req.body.userid },
		{ _id: 0 }
	);
	console.log("borrowerData is: ", borrowerData);
	if (borrowerData && borrowerData.length > 0) {
		for (let i = 0; i < borrowerData.length; i++) {
			await borrowerData[i].populate("payableTo").execPopulate();
			let payableToUser = await Users.findById(borrowerData[i].payableTo);
			console.log("payableToUser: ", payableToUser.username);
			if (borrowerData[i].pendingAmt > 0) {
				let dashObj = {
					payableTo: payableToUser.username,
					pendingAmt: borrowerData[i].pendingAmt,
				};
				dashData.youOwe.push(dashObj);
			} else if (borrowerData[i].pendingAmt < 0) {
				let dashObj = {
					borrower: payableToUser.username,
					pendingAmt: Math.abs(borrowerData[i].pendingAmt),
				};
				dashData.youAreOwed.push(dashObj);
			}
		}
	}

	res.writeHead(200, {
		"Content-Type": "text/plain",
	});
	res.end(JSON.stringify(dashData));
});

module.exports = router;

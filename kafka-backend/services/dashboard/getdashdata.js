"use strict";
const Balance = require("../../Models/BalancesModel");
const Users = require("../../Models/UserModel");

let handle_request = async (msg, callback) => {
	console.log("---------------Kafka backend :: getDashData----------------");
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	let dashData = { youOwe: [], youAreOwed: [] };

	try {
		let payableData = await Balance.find(
			{ payableTo: msg.userid },
			{ _id: 0 }
		).populate({
			path: "borrower",
			select: "username",
		});
		console.log("payableData is: ", payableData);
		if (payableData && payableData.length > 0) {
			for (let i = 0; i < payableData.length; i++) {
				//await payableData[i].populate("borrower").execPopulate();
				//let borrowerUser = await Users.findById(payableData[i].borrower);
				//console.log("borrower is: ,", borrowerUser.username);
				//console.log("payableData[i].pendingAmt: ", payableData[i].pendingAmt);
				if (payableData[i].pendingAmt > 0) {
					let dashObj = {
						borrower: payableData[i].borrower.username,
						pendingAmt: payableData[i].pendingAmt,
					};
					dashData.youAreOwed.push(dashObj);
				} else if (payableData[i].pendingAmt < 0) {
					let dashObj = {
						payableToUserId: payableData[i].borrower._id,
						payableTo: payableData[i].borrower.username,
						pendingAmt: Math.abs(payableData[i].pendingAmt),
					};
					dashData.youOwe.push(dashObj);
				}
				console.log("dashData after first query :", dashData);
			}
		}

		let borrowerData = await Balance.find(
			{ borrower: msg.userid },
			{ _id: 0 }
		).populate({
			path: "payableTo",
			select: "username",
		});
		console.log("borrowerData is: ", borrowerData);
		if (borrowerData && borrowerData.length > 0) {
			for (let i = 0; i < borrowerData.length; i++) {
				// await borrowerData[i].populate("payableTo").execPopulate();
				// let payableToUser = await Users.findById(borrowerData[i].payableTo);
				// console.log("payableToUser: ", payableToUser.username);
				if (borrowerData[i].pendingAmt > 0) {
					let dashObj = {
						payableToUserId: borrowerData[i].payableTo._id,
						payableTo: borrowerData[i].payableTo.username,
						pendingAmt: borrowerData[i].pendingAmt,
					};
					dashData.youOwe.push(dashObj);
				} else if (borrowerData[i].pendingAmt < 0) {
					let dashObj = {
						borrower: borrowerData[i].payableTo.username,
						pendingAmt: Math.abs(borrowerData[i].pendingAmt),
					};
					dashData.youAreOwed.push(dashObj);
				}
			}
		}
		response.status = 200;
		response.data = JSON.stringify(dashData);
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = 500;
		err.data = "Error in Data";
		return callback(err, null);
	}
};

exports.handle_request = handle_request;

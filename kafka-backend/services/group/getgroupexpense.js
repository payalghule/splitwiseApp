"use strict";
const Expense = require("../../Models/ExpenseModel");
const Users = require("../../Models/UserModel");

let handle_request = async (msg, callback) => {
	console.log("----------kafka backend: GET GROUP EXPENSES-----------");
	console.log("Message received for GET GROUP EXPENSES kafka backend is:", msg);
	let err = {};
	let response = {};
	let expArray = [];
	try {
		let expResult = await Expense.find(
			{
				groupId: msg.gId,
				groupName: msg.gName,
			},
			{ paidBy: 1, expDesc: 1, amount: 1, createdAt: 1, borrowers: 1 }
		).sort({ createdAt: -1 });
		//console.log("expResult: ", expResult);
		if (expResult && expResult.length > 0) {
			for (let i = 0; i < expResult.length; i++) {
				let paidByUser = await Users.findById(expResult[i].paidBy).populate(
					"paidBy"
				);
				if (paidByUser) {
					console.log("paidByUser is: ", paidByUser.username);
					let obj = {
						paidBy: expResult[i].paidBy,
						expDesc: expResult[i].expDesc,
						amount: expResult[i].amount,
						createdAt: expResult[i].createdAt,
						borrowers: expResult[i].borrowers,
						paidbyUser: paidByUser.username,
					};

					//console.log("obj is", obj);
					expArray.push(obj);
				}
			}
		}
		console.log("expArray is", expArray);
		response.status = 200;
		response.data = JSON.stringify(expArray);
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = 500;
		err.data = "Error in Data";
		return callback(err, null);
	}
};

exports.handle_request = handle_request;

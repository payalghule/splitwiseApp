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
		const expResult = await Expense.find({
			groupId: msg.gId,
			groupName: msg.gName,
		})
			.populate({
				path: "paidBy",
				select: "username",
			})
			.sort({ createdAt: -1 });
		//console.log("expResult: ", expResult);
		//console.log("expResult username populate: ", expResult[0].paidBy.username);

		if (expResult && expResult.length > 0) {
			for (let i = 0; i < expResult.length; i++) {
				let obj = {
					paidBy: expResult[i].paidBy._id,
					expDesc: expResult[i].expDesc,
					amount: expResult[i].amount,
					createdAt: expResult[i].createdAt,
					borrowers: expResult[i].borrowers,
					paidbyUser: expResult[i].paidBy.username,
					expId: expResult[i]._id,
					comments: expResult[i].comments,
					groupId: expResult[i].groupId,
					groupName: expResult[i].groupName,
				};

				//console.log("obj is", obj);
				expArray.push(obj);
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

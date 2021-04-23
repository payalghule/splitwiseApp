"use strict";
const Expense = require("../../Models/ExpenseModel");
const Balance = require("../../Models/BalancesModel");
const RecentActivity = require("../../Models/RecentActivityModel");
let handle_request = async (msg, callback) => {
	console.log("----------kafka backend: addexpense -----------");
	console.log("Message received for addexpense kafka backend is:", msg);
	let groupMembers = msg.groupMembers;
	let groupStrength = groupMembers.length;
	let paidBy = msg.paidBy;
	let amount = msg.amount;
	let splittedAmt = amount / groupMembers.length;
	let err = {};
	let response = {};
	try {
		//to insert into Balance Model

		for (let i = 0; i < groupMembers.length; i++) {
			if (groupMembers[i] !== paidBy) {
				const amtResult = await Balance.find(
					{ borrower: groupMembers[i], payableTo: paidBy },
					{ pendingAmt: 1 }
				);

				if (amtResult.length > 0 && amtResult) {
					console.log("amtResult pendingAmt: ", amtResult[0].pendingAmt);
					//update pendingAmt +
					let newAmt = amtResult[0].pendingAmt + splittedAmt;
					let amountUpdate = await Balance.updateOne(
						{ borrower: groupMembers[i], payableTo: paidBy },
						{ $set: { pendingAmt: newAmt } }
					);
					if (amountUpdate) {
						console.log("Pending Amount updated at place 1");
					}
				} else {
					const amtResultRev = await Balance.find(
						{ borrower: paidBy, payableTo: groupMembers[i] },
						{ pendingAmt: 1 }
					);

					if (amtResultRev.length > 0 && amtResultRev) {
						console.log(
							"amtResultRev pendingAmt: ",
							amtResultRev[0].pendingAmt
						);
						//update pendingAmt -
						let newAmt = amtResultRev[0].pendingAmt - splittedAmt;
						let amountUpdate = await Balance.updateOne(
							{ borrower: paidBy, payableTo: groupMembers[i] },
							{ $set: { pendingAmt: newAmt } }
						);
						if (amountUpdate) {
							console.log("Pending Amount updated at place 2");
						}
					} else {
						//insert new balance entry here
						let balance = new Balance({
							borrower: groupMembers[i],
							payableTo: paidBy,
							pendingAmt: amount / groupStrength,
						});

						balance.save();
					}
				}
			}
		}

		//to add into expense table

		let expenseData = new Expense({
			groupId: msg.groupId,
			groupName: msg.groupName,
			paidBy: paidBy,
			expDesc: msg.description,
			amount: amount,
			borrowers: [],
		});

		groupMembers
			.filter((member) => {
				return member !== paidBy;
			})
			.forEach((mem) => {
				console.log(mem);
				let borrowersObj = {
					_id: mem,
					pendingAmt: splittedAmt,
				};
				expenseData.borrowers.push(borrowersObj);
			});

		console.log("expenseData is: ", expenseData);

		const saveExp = await expenseData.save();
		let recent = new RecentActivity({
			paidBy: paidBy,
			eventId: "0",
			eventType: "ADD_EXP",
			groupName: msg.groupName,
			expDesc: msg.description,
			amount: amount,
		});
		console.log("data to insert into recent activity is:", recent);
		recent.save();

		if (!saveExp) {
			response.status = 401;
			response.data = JSON.stringify({ result: "NO_RECORD" });
			return callback(null, response);
		} else {
			response.status = 200;
			response.data = JSON.stringify({ result: "EXPENSE_ADDED" });
			return callback(null, response);
		}
	} catch (error) {
		console.log(error);
		err.status = 500;
		err.data = "Error in Data";
		return callback(err, null);
	}
};

exports.handle_request = handle_request;

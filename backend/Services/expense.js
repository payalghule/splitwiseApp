"use strict";
const express = require("express");
const router = express();
const Expense = require("../Models/ExpenseModel");
const Balance = require("../Models/BalancesModel");
const { ObjectId } = require("mongodb");

router.post("/addexpense", async (req, res) => {
	console.log("inside addexpense  backend");
	console.log("req.body", req.body);
	let groupMembers = req.body.groupMembers;
	let groupStrength = groupMembers.length;
	let paidBy = req.body.paidBy;
	let amount = req.body.amount;
	let splittedAmt = amount / groupMembers.length;
	let transObj = {};
	let expResult = await Expense.find({ groupId: req.body.groupId });
	console.log("expResult", expResult);
	let expenseObj = {
		paidBy: paidBy,
		expDesc: req.body.description,
		amount: amount,
	};
	//if exp document is present:
	//update existing document with below
	//push expenseObj
	//update transaction entries with new balances
	if (expResult.length > 0 && expResult) {
		console.log(expResult[0].exp);
		//push expense entry
		expResult[0].exp.push(expenseObj);
		//filter for members & create trans entry
		// for (let i = 0; i < groupMembers.length; i++) {
		// 	if (groupMembers[i] !== paidBy) {
		// 		console.log("gm: ", groupMembers[i]);
		// 		let amtResult = await Expense.find(
		// 			{
		// 				"groupTransaction.borrower": ObjectId(groupMembers[i]),
		// 				"groupTransaction.payableTo": ObjectId(paidBy),
		// 			},
		// 			{ "groupTransaction.pendingAmt.$": 1, _id: 0 }
		// 		);
		// 		console.log("amtResult: ", amtResult);
		// 	}
		// }
		let updated = await expResult[0].save();

		if (!updated) {
			res.writeHead(400, {
				"Content-Type": "text/plain",
			});
			res.end("ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end("EXPENSE_ADDED");
		}
	} //first time to create entry
	else {
		let expenseData = new Expense({
			groupId: req.body.groupId,
			groupName: req.body.groupName,
			exp: [],
			groupTransaction: [],
		});

		expenseData.exp.push(expenseObj);

		groupMembers
			.filter((member) => {
				return member !== paidBy;
			})
			.forEach((mem) => {
				console.log(mem);
				transObj = {
					borrower: mem,
					payableTo: paidBy,
					pendingAmt: amount / groupStrength,
				};
				//transArray.push(transObj);
				expenseData.groupTransaction.push(transObj);
			});

		console.log("expenseData is: ", expenseData);

		const saveExp = await expenseData.save();
		if (!saveExp) {
			res.writeHead(400, {
				"Content-Type": "text/plain",
			});
			res.end("ERROR");
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.end("EXPENSE_ADDED");
		}
	}

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
					console.log("amtResultRev pendingAmt: ", amtResultRev[0].pendingAmt);
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
					//insert new entry here
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
});
module.exports = router;

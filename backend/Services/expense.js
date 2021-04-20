"use strict";
const express = require("express");
const router = express();
const Expense = require("../Models/ExpenseModel");
const Balance = require("../Models/BalancesModel");

router.post("/addexpense", async (req, res) => {
	console.log("inside addexpense  backend");
	console.log("req.body", req.body);
	let groupMembers = req.body.groupMembers;
	let groupStrength = groupMembers.length;
	let paidBy = req.body.paidBy;
	let amount = req.body.amount;
	let splittedAmt = amount / groupMembers.length;
	let expResult = await Expense.find({ groupId: req.body.groupId });
	console.log("expResult", expResult);

	let expenseData = new Expense({
		groupId: req.body.groupId,
		groupName: req.body.groupName,
		paidBy: paidBy,
		expDesc: req.body.description,
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

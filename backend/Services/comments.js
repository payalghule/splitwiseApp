"use strict";
const express = require("express");
const router = express();
const Expense = require("../Models/ExpenseModel");
const mongoose = require("mongoose");
router.post("/addcomment", (req, res) => {
	console.log("---------In Backend: Add comment---------");
	console.log("req.body: ", req.body);

	const comment = {
		message: req.body.message,
		userId: req.body.userId,
		username: req.body.username,
		msgCreatedAt: new Date(),
	};
	Expense.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body.expId) },
		{
			$push: { comments: comment },
		},
		(err, result) => {
			if (err) {
				console.log("Unable to fetch user details.", err);
				let err = {};
				err.status = 500;
				err.data = "ERROR";
				return res.status(err.status).send(err.data);
			} else {
				if (result) {
					console.log("Comments ", result);
					return res.status(200).send("COMMENT_ADDED");
				} else {
					let err = {};
					err.status = 401;
					err.data = "ERROR";
					return res.status(err.status).send(err.data);
				}
			}
		}
	);
});

module.exports = router;

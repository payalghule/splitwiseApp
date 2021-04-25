"use strict";
const Groups = require("../../Models/GroupModel");
const GroupBalance = require("../../Models/GroupBalancesModel");
const mongoose = require("mongoose");
let handle_request = async (msg, callback) => {
	console.log("----------kafka backend: GET GROUP EXIT-----------");
	console.log("Message received for GET GROUP EXIT kafka backend is:", msg);
	let err = {};
	let response = {};
	try {
		let balEntry = await GroupBalance.find({
			$and: [
				{
					$or: [
						{ payableTo: mongoose.Types.ObjectId(msg.exitUserId) },
						{ borrower: mongoose.Types.ObjectId(msg.exitUserId) },
					],
				},
				{
					$and: [{ groupId: msg.groupId }, { pendingAmt: { $ne: 0 } }],
				},
			],
		});
		console.log("balEntry is: ", balEntry);

		if (balEntry.length === 0) {
			let membDeleted = await Groups.findOneAndUpdate(
				{
					_id: msg.groupId,
				},
				{
					$pull: {
						groupMembers: { _id: mongoose.Types.ObjectId(msg.exitUserId) },
					},
				}
			);
			if (membDeleted) {
				console.log("membDeleted: ", membDeleted);
				response.status = 200;
				response.data = JSON.stringify({ result: "EXIT_SUCCESS" });
				return callback(null, response);
			} else {
				response.status = 400;
				response.data = JSON.stringify({ result: "DELETE_MEMB_FAILED" });
				return callback(null, response);
			}
		} else {
			response.status = 200;
			response.data = JSON.stringify({ result: "CLEAR_DUES" });
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

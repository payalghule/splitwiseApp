"use strict";
const Groups = require("../../Models/GroupModel");
let handle_request = async (msg, callback) => {
	console.log("----------kafka backend: GET GROUP MEMBERS-----------");
	console.log("Message received for GET GROUP MEMBERS kafka backend is:", msg);
	let err = {};
	let response = {};
	try {
		let members = await Groups.aggregate([
			{
				$match: {
					groupName: msg.gName,
					"groupMembers.isAccepted": 1,
				},
			},
			{
				$project: {
					groupMembers: {
						$filter: {
							input: "$groupMembers",
							as: "member",
							cond: {
								$eq: ["$$member.isAccepted", 1],
							},
						},
					},
				},
			},
		]);
		if (members) {
			response.status = 200;
			response.data = JSON.stringify(members);
			return callback(null, response);
		} else {
			response.status = 401;
			response.data = JSON.stringify({ result: "NO_RECORD" });
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

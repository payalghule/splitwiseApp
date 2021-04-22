"use strict";
const Users = require("../../Models/UserModel");
const RecentActivity = require("../../Models/RecentActivityModel");

let handle_request = async (msg, callback) => {
	console.log(
		"---------------Kafka backend :: get Recent Activity----------------"
	);
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	let actData = [];
	try {
		let actList = await RecentActivity.find({}).sort({ createdAt: -1 });

		if (actList) {
			console.log("length", actList.length);

			for (let i = 0; i < actList.length; i++) {
				await actList[i].populate("paidBy settleWithUserId").execPopulate();

				let user = await Users.findById(actList[i].paidBy);
				let settle = await Users.findById(actList[i].settleWithUserId);

				if (actList[i].eventId === 0) {
					let actObj = {
						paidBy: user.username,
						groupName: actList[i].groupName,
						expDesc: actList[i].expDesc,
						amount: actList[i].amount,
						eventId: actList[i].eventId,
						eventType: actList[i].eventType,
						createdAt: actList[i].createdAt,
						_id: actList[i]._id,
					};
					console.log("actObj", actObj);
					actData.push(actObj);
				} else {
					let actObj = {
						settlededBy: user.username,
						settleWithUser: settle.username,
						amount: actList[i].amount,
						eventId: actList[i].eventId,
						eventType: actList[i].eventType,
						createdAt: actList[i].createdAt,
						_id: actList[i]._id,
					};
					console.log("actObj", actObj);
					actData.push(actObj);
				}
			}
		}

		response.status = 200;
		response.data = JSON.stringify(actData);
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = 500;
		err.data = "Error in Data";
		return callback(err, null);
	}
};

exports.handle_request = handle_request;

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
		let actList = await RecentActivity.find({})
			.populate([
				{
					path: "paidBy",
					select: "username",
				},
				{
					path: "settleWithUserId",
					select: "username",
				},
			])
			.sort({ createdAt: -1 });
		console.log("actList is: ", actList);

		if (actList) {
			console.log("length", actList.length);

			for (let i = 0; i < actList.length; i++) {
				if (actList[i].eventId === 0) {
					let actObj = {
						paidBy: actList[i].paidBy.username,
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
				} else if (actList[i].eventId === 1) {
					let actObj = {
						settlededBy: actList[i].paidBy.username,
						settleWithUser: actList[i].settleWithUserId.username,
						amount: actList[i].amount,
						eventId: actList[i].eventId,
						eventType: actList[i].eventType,
						createdAt: actList[i].createdAt,
						_id: actList[i]._id,
					};
					console.log("actObj2", actObj);
					actData.push(actObj);
				} else if (actList[i].eventId === 2) {
					let actObj = {
						commentedBy: actList[i].commentedBy,
						gName: actList[i].gName,
						expDesc: actList[i].expDesc,
						eventId: actList[i].eventId,
						eventType: actList[i].eventType,
						comment: actList[i].comment,
						createdAt: actList[i].createdAt,
					};
					console.log("actObj3", actObj);
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

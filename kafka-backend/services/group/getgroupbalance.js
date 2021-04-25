"use strict";
const Groups = require("../../Models/GroupModel");
const GroupBalance = require("../../Models/GroupBalancesModel");
const Users = require("../../Models/UserModel");

let handle_request = async (msg, callback) => {
	console.log("----------kafka backend: GET GROUP Balances-----------");
	console.log("Message received for GET GROUP Balances kafka backend is:", msg);
	let err = {};
	let response = {};
	let groupBalArray = [];
	let groupBalMap = {};
	let gId = msg.groupId;
	try {
		let members = await Groups.find({ _id: gId }, { "groupMembers._id": 1 });
		if (members) {
			console.log("members: ", members[0].groupMembers);
			let groupMembers = members[0].groupMembers;
			for (let i = 0; i < groupMembers.length; i++) {
				groupBalMap[groupMembers[i]._id] = 0;
			}
			//console.log("groupBalMap is", groupBalMap);

			let groupBal = await GroupBalance.find({ groupId: gId });
			if (groupBal) {
				//console.log("groupBal is: ", groupBal);

				for (let i = 0; i < groupBal.length; i++) {
					groupBalMap[groupBal[i].borrower] =
						groupBalMap[groupBal[i].borrower] + (0 - groupBal[i].pendingAmt);
					groupBalMap[groupBal[i].payableTo] =
						groupBalMap[groupBal[i].payableTo] + groupBal[i].pendingAmt;
				}
				console.log(groupBalMap);

				for (const [key, value] of Object.entries(groupBalMap)) {
					let memberUser = await Users.findById(key);

					let tempObj = {
						userId: key,
						username: memberUser.username,
						pendingAmt: value,
					};
					groupBalArray.push(tempObj);
				}
				console.log("groupBalArray is: ", groupBalArray);
			} else {
				console.log("No groupdata");
			}
		}

		response.status = 200;
		response.data = JSON.stringify(groupBalArray);
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = 500;
		err.data = "Error in Data";
		return callback(err, null);
	}
};

exports.handle_request = handle_request;

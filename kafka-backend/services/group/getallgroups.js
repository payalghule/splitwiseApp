"use strict";
const Groups = require("../../Models/GroupModel");

function handle_request(msg, callback) {
	console.log("---------------Kafka backend :: getallgroups----------------");
	console.log("Message is: ", msg);
	Groups.find(
		{ groupMembers: msg.groupMember },
		{ _id: 1, groupName: 1, isAccepted: 1 },
		(err, allGroups) => {
			console.log("getallgroups result is:", allGroups);

			if (err) {
				callback(null, 500);
			} else if (allGroups === null) {
				callback(null, 207);
			} else {
				callback(null, allGroups);
			}
		}
	);
}

exports.handle_request = handle_request;

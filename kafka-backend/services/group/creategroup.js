"use strict";
const Users = require("../../Models/UserModel");
const Groups = require("../../Models/GroupModel");
function handle_request(msg, callback) {
	console.log("----------kafka backend: CREATE GROUP-----------");
	console.log("Message received for create group kafka backend is:", msg);
	console.log("GroupName:", msg.groupName);
	console.log("created by:", msg.groupCreatedby);
	console.log("members:", msg.groupMembers);

	Groups.find({ groupName: msg.groupName }, (err, group) => {
		console.log("result from group model kafka backend is:", group);
		if (err) {
			console.log(err);
			callback(null, 500);
		}
		if (group.length > 0) {
			console.log("Group Name already exists");
			callback(null, 299);
		} else {
			let newGroup = new Groups({
				groupName: msg.groupName,
				createdBy: msg.groupCreatedby,
				groupMembers: msg.groupMembers,
			});

			// for (let i = 0; i < msg.groupMembers; i++) {
			// 	let data = {
			// 		member_id: msg.groupMembers[i],
			// 		isAccepted: 0,
			// 	};
			// 	console.log("data is :", data);
			// 	newGroup.groupMembers.push(data);
			// }
			// console.log("New group details: ", newGroup);

			newGroup.save(newGroup, (err, result) => {
				if (err) {
					console.log("server error:", err);
					callback(null, 500);
				} else {
					console.log("Group Inserted Successfully!");
					callback(null, 200);
				}
			});
		}
	});

	//   Users.find({ email }, (err, results) => {
	//     console.log("signup result is:", results);
	//     if (err) {
	//       console.log(err);
	//       callback(null, 500);
	//     }
	//   });
}

exports.handle_request = handle_request;

const Expense = require("../../Models/ExpenseModel");
const mongoose = require("mongoose");
const RecentActivity = require("../../Models/RecentActivityModel");

let handle_request = async (msg, callback) => {
	console.log("---------------Kafka backend :: Add comment----------------");
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	try {
		const comment = {
			message: msg.message,
			userId: msg.userId,
			username: msg.username,
			msgCreatedAt: new Date(),
		};
		let added = await Expense.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(msg.expId) },
			{
				$push: { comments: comment },
			}
		);
		if (added) {
			let recent = new RecentActivity({
				paidBy: msg.userId,
				gName: msg.groupName,
				expDesc: msg.expDesc,
				commentedBy: msg.username,
				eventId: "2",
				eventType: "ADD_COMMENT",
				comment: msg.message,
			});

			console.log("data to insert into recent activity is:", recent);
			recent.save();

			response.data = "COMMENT_ADDED";
			response.status = 200;
			return callback(null, response);
		} else {
			response.data = "COMMENT_ADD_FAIL";
			response.status = 401;
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

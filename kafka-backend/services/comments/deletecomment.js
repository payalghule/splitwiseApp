const Expense = require("../../Models/ExpenseModel");
const mongoose = require("mongoose");

let handle_request = async (msg, callback) => {
	console.log(
		"---------------Kafka backend :: delete comment comment----------------"
	);
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	try {
		let deleted = await Expense.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(msg.expId) },
			{
				$pull: {
					comments: { _id: mongoose.Types.ObjectId(msg.delcommentId) },
				},
			}
		);
		if (deleted) {
			response.data = "COMMENT_DELETED";
			response.status = 200;
			return callback(null, response);
		} else {
			response.data = "NO_COMMENT";
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

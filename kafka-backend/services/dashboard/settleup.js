const RecentActivity = require("../../Models/RecentActivityModel");
const Balance = require("../../Models/BalancesModel");

let handle_request = async (msg, callback) => {
	console.log("---------------Kafka backend :: settle up----------------");
	console.log("Message is: ", msg);
	let err = {};
	let response = {};
	try {
		let updated = await Balance.updateOne(
			{
				$and: [
					{
						$or: [
							{ payableTo: msg.settlededById },
							{ borrower: msg.settlededById },
						],
					},
					{
						$or: [
							{ payableTo: msg.settleWithUserId },
							{ borrower: msg.settleWithUserId },
						],
					},
				],
			},
			{ $set: { pendingAmt: 0 } }
		);

		let recent = new RecentActivity({
			paidBy: msg.settlededById,
			eventId: "1",
			eventType: "SETTLE_EXP",
			settleWithUserId: msg.settleWithUserId,
			amount: msg.settleUserAmt,
		});
		console.log("data to insert into recent activity is:", recent);
		recent.save();

		if (updated) {
			response.data = "SETTLED_SUCCESS";
			response.status = 200;
			return callback(null, response);
		} else {
			response.data = "SETTLE_ERROR";
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

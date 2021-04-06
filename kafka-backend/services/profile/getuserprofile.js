const Users = require("../../Models/UserModel");
const { ObjectId } = require("mongodb");
function handle_request(message, callback) {
	Users.findOne({ _id: ObjectId(message.user_id) }, (err, user) => {
		if (err) {
			callback(null, 500);
		} else if (user !== null) {
			console.log("Customer found");
			callback(null, user);
		}
	});
}

exports.handle_request = handle_request;

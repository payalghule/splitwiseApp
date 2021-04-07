const Users = require("../../Models/UserModel");
//const { ObjectId } = require("mongodb");
function handle_request(message, callback) {
	console.log("-----------In Kafka backend:getuserprofile---------------");
	console.log("message is:", message);
	Users.findById({ _id: message.userid }, (err, user) => {
		if (err) {
			callback(null, 500);
		} else if (user == null) {
			callback(null, 207);
		} else if (user !== null) {
			console.log("In Kafka backend ::User found: ", user);
			callback(null, user);
		}
	});
}

exports.handle_request = handle_request;

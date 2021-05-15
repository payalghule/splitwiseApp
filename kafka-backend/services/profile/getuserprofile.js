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
			let userData = {
				phone: user.phone,
				currency: user.currency,
				timezone: user.timezone,
				language: user.language,
				_id: user._id,
				email: user.email,
				username: user.username,
				user_image: user.user_image,
			};
			console.log("In Kafka backend ::User found: ", userData);
			callback(null, userData);
		}
	});
}

exports.handle_request = handle_request;

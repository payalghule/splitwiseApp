var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Users = require("../../Models/UserModel");

function handle_request(message, callback) {
	console.log("inside handle req", message.email);
	let emailId = message.email;
	console.log("EmailId is:", emailId);

	Users.findOne({ email: emailId }, function (err, user) {
		console.log("user from DB reacibed", user);

		if (err) {
			callback(null, 500);
		} else if (user === null) {
			callback(null, 207);
		} else {
			bcrypt.compare(message.password, user.password, (err, isPasswordTrue) => {
				if (err) {
					callback(null, 500);
				} else {
					if (isPasswordTrue) {
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
						callback(null, userData);
					} else {
						callback(null, 209);
					}
				}
			});
		}
	});
}
exports.handle_request = handle_request;

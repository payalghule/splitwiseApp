"use strict";
const Users = require("../../Models/UserModel");

function handle_request(msg, callback) {
	console.log("-----------In Kafka backend:updateuser---------------");
	console.log("message is", msg);

	Users.findById({ _id: msg.userid }, (err, user) => {
		console.log("get user result is:", user);

		if (err) {
			console.log("server error:", err);
			callback(null, 500);
		} else if (user === null) {
			console.log("unable to fetch user details");
			callback(null, 207);
		} else {
			Users.find(
				{ _id: { $ne: msg.userid }, email: msg.email },
				(err, result) => {
					if (err) {
						console.log("server error:", err);
						callback(null, 500);
					}
					console.log("Result for checking email: ", result);
					if (result.length > 0) {
						console.log(`Email ${msg.email} already exists`);
						callback(null, 299);
					} else {
						//update user
						console.log("update user details from DB", user);
						console.log("User name is:", msg.username);
						user.username = msg.username;
						user.email = msg.email;
						user.phone = msg.phone;
						user.currency = msg.currency;
						user.language = msg.language;
						user.timezone = msg.timezone;

						console.log("Save user information:", user);
						user.save((error) => {
							if (error) {
								console.log(`Saving Error in update profile: ${error}`);
								callback(null, 500);
							}
							console.log("Successfully Updated");
							//callback(null, 200);
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

							console.log("data sent back is: ", userData);

							callback(null, userData);
						});
					}
				}
			);
		}
	});
}

exports.handle_request = handle_request;

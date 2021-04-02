'use strict';
const bcrypt = require('bcrypt');
const Users = require('../../Models/UserModel');
const saltRounds = 10;

function handle_request(msg, callback) {
	const { username } = msg;
	const { email } = msg;
	const { password } = msg;

	Users.find({ email }, (err, results) => {
		if (err) {
			console.log(err);
			callback(null, 500);
		}
		if (results.length > 0) {
			console.log(`Email ${email} already exists`);
			callback(null, 299);
		} else {
			bcrypt.hash(password, saltRounds, (error, hash) => {
				if (error) {
					console.log(error);
					callback(null, 'Hashing Error');
				}

				let userToCreate = Users({
					email: email,
					password: hash,
					username: username,
				});

				userToCreate.save((error) => {
					if (error) {
						console.log(`Saving Error in Signup: ${error}`);
						callback(null, 500);
					}
					console.log('Successfully Created');
					callback(null, 200);
				});
			});
		}
	});
}

exports.handle_request = handle_request;

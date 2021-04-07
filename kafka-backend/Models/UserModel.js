const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String },
		phone: { type: String, default: "None" },
		currency: { type: String, default: "USD" },
		timezone: { type: String, default: "Pacific time" },
		language: { type: String, default: "English" },
		user_image: { type: String },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("user", usersSchema);

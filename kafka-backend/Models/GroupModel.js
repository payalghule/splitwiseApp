const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
	{
		groupName: { type: String, required: true },
		isAccepted: { type: Number, default: 0 },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		groupMembers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("group", groupSchema);

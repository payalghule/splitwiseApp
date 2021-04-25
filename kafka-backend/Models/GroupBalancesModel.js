const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupBalanceSchema = new Schema(
	{
		borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		payableTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		pendingAmt: { type: Number },
		groupName: { type: String },
		groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("groupBalance", groupBalanceSchema);

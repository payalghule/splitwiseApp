const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
	{
		expDesc: { type: String },
		amount: { type: Number },
		group: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
		paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		paidTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		createdAt: { type: Date },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("expense", expenseSchema);

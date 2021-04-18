const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
	{
		groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
		expense: [
			{
				paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				expDesc: { type: String },
				amount: { type: Number },
				paidTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], //this is
			},
		],
		transaction: [
			{
				borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				payableTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				amountPerPerson: { type: Number },
			},
		],
		createdAt: { type: Date },
		entryType: { type: String },
		messages: [
			{
				message: { type: String },
				user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				createdAt: { type: Date },
			},
		],
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("expense", expenseSchema);

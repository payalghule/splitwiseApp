import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import explogo from "../../images/explogo.png";
import axios from "axios";
import backendServer from "../../backEndConfig";
import { connect } from "react-redux";
import { getGroupExpense } from "../../redux/actions/showGroupActions";
import { getGroupBalance } from "../../redux/actions/groupBalanceActions";
import swal from "sweetalert";

function AddExpense(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [description, setdescription] = useState();
	const [amount, setAmount] = useState();

	const onSubmitExpense = (e) => {
		e.preventDefault();
		let groupmembs = props.groupMembers[0].groupMembers;
		let groupMembsArray = groupmembs.map((member) => {
			return member._id;
		});
		console.log("groupMembsArray: ", groupMembsArray);

		const expenseData = {
			description: description,
			amount: amount,
			groupId: props.groupId,
			groupName: props.groupName,
			groupMembers: groupMembsArray,
			paidBy: localStorage.getItem("userid"), //email
		};

		console.log("expense data: ", expenseData);
		const grpData = { gName: props.groupName, gId: props.groupId };
		// const currentDate = new Date();
		// const formattedDate = currentDate
		// 	.toLocaleDateString("en-GB", {
		// 		day: "2-digit",
		// 		month: "short",
		// 		year: "numeric",
		// 	})
		// 	.replace(/ /g, "-");

		// const expenseDatatoParent = {
		// 	expDesc: description,
		// 	amount: amount,
		// 	paidbyUser: localStorage.getItem("username"),
		// 	date: formattedDate,
		// };

		// props.method(expenseDatatoParent);
		// console.log("data to post", expenseData);

		axios.defaults.withCredentials = true;
		axios
			.post(`${backendServer}/expense/addexpense`, expenseData)
			.then((response) => {
				console.log("response after post", response);
				if (response.status === 200) {
					swal("Expense added sucessfully!", { icon: "success" });
					props.getGroupExpense(grpData);
					props.getGroupBalance({ groupId: props.groupId });
				}
			})
			.catch((error) => {
				swal("Failed to add expense", "error");
				console.log("error:", error);
			});
		handleClose();
	};

	return (
		<div>
			<div>
				<button className="orange-button" onClick={handleShow}>
					Add an expense
				</button>
			</div>

			<Modal show={show} onHide={handleClose} animation={false} centered>
				<div>
					<Modal.Header closeButton className="modal-header modal-head">
						<Modal.Title className="text-center">Add an Expense</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-md-2">
								<img src={explogo} className="exp-logo" alt="explogo" />
							</div>
							<div className="col-md-8">
								<form
									className="form"
									id="expense-form"
									onSubmit={onSubmitExpense}
								>
									<div className="form-group">
										<label>Description</label>
										<input
											id="description"
											name="description"
											onChange={(e) => {
												setdescription(e.target.value);
											}}
											className="form-control"
											type="text"
											placeholder="Enter Description"
											required
										/>
										<p id="error-description" className="text-danger"></p>
									</div>

									<div className="form-group">
										<label>Amount</label>
										<input
											id="amount"
											name="amount"
											placeholder="0.00$"
											onChange={(e) => {
												setAmount(e.target.value);
											}}
											className="form-control"
											type="number"
											step=".01"
											required
										/>
										<p id="error-expense-amount" className="text-danger"></p>
									</div>
									<div>
										<p>
											<small>Paid by you and Split Equally</small>
										</p>
									</div>

									<button
										type="submit"
										onClick={handleClose}
										className="float -left orange-button"
									>
										close
									</button>
									<button type="submit" className="float-right green-button">
										Save
									</button>
								</form>
								<div
									id="error-message"
									style={{ display: "none" }}
									className="mt-4 alert alert-danger"
								></div>
								<div
									id="success-message"
									style={{ display: "none" }}
									className="mt-4 alert alert-success"
								></div>
								<br />
							</div>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</div>
	);
}
//export default AddExpense;

export default connect(null, { getGroupExpense, getGroupBalance })(AddExpense);

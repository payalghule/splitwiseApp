/* eslint-disable */
import React, { Component } from "react";
import { Redirect } from "react-router";
import update from "react-addons-update";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import AddExpense from "../Expense/AddExpense";
import Comments from "./Comments";
import backendServer from "../../backEndConfig";
import expensepic from "../../images/expensepic.PNG";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	getGroupMembersData,
	getGroupExpense,
} from "../../redux/actions/showGroupActions";
import LeftSidebar from "../Layout/LeftSidebar";
import noexp from "../../images/noexp.PNG";
import GroupBalance from "./GroupBalance";
import "../../App.css";

//to show list of groups
class ShowGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupName: "",
			groupId: "",
			groupMembers: [],
			groupExpense: [],
			userId: localStorage.getItem("userid"),
			username: localStorage.getItem("username"),
			exitedGroup: 0,
			visible: false,
			expenseId: "",
		};
		//this.getGroupExpense = this.getGroupExpense.bind(this);
		this.onExitGroup = this.onExitGroup.bind(this);
	}

	componentDidMount() {
		//to get the groupmembers
		const groupNameFromProps = this.props.match.params.groupName;
		const { groupId } = this.props.location.state;
		console.log("groupId is", groupId);
		this.setState({
			groupName: groupNameFromProps,
			groupId: groupId,
		});
		const grpData = { gName: groupNameFromProps, gId: groupId };
		console.log("groupData: ", grpData);
		this.props.getGroupMembersData(grpData);
		this.props.getGroupExpense(grpData);
	}

	addExpenseData = (expense) => {
		this.setState({
			groupExpense: update(this.state.groupExpense, { $unshift: [expense] }),
		});
	};

	onExitGroup = () => {
		console.log("In Exit Group Handler");
		//const groupNameFromProps = this.props.match.params.groupName;
		const userId = this.state.userId;
		const gId = this.state.groupId;
		const exitData = { groupId: gId, exitUserId: userId };
		console.log("exitData: ", exitData);
		axios
			.post(`${backendServer}/groups/groupexit`, exitData)
			.then((response) => {
				console.log("response from Axios query", response.data);
				if (response.status == 200 && response.data.result === "EXIT_SUCCESS") {
					alert("Exited the group Successfully");
					//dashboard redirect
					this.setState({
						exitedGroup: 1,
					});
				}
				if (response.status == 200 && response.data.result === "CLEAR_DUES") {
					alert(
						"You are involved in multiple activities, can not leave the group"
					);
				}
			})
			.catch((error) => {
				console.log(
					"Expense Data :error occured while connecting to backend:",
					error
				);
			});
	};
	render() {
		console.log("this.props.groupMembers: ", this.props.groupMembers);
		console.log("groupId is: ", this.state.groupId);
		let gName = this.state.groupName;
		let redirectVar = null;
		let groupExpense = this.props.groupExpenses;
		if (!localStorage.getItem("token")) {
			redirectVar = <Redirect to="/Login" />;
		}
		if (this.state.exitedGroup === 1) {
			redirectVar = <Redirect to="/MyGroups" />;
		}
		return (
			<div className="dashboard">
				{redirectVar}
				<NavbarDashBoard />
				<div className="container">
					<div className="row">
						<div className="col-sm-2">
							<LeftSidebar />
						</div>

						<div className="col" id="dash-center">
							<div>
								<div className="row dashheader">
									<div className="col">
										<h3>{gName}</h3>
									</div>
									<div className="col-sm-3">
										<button className="grey-button" onClick={this.onExitGroup}>
											Exit Group
										</button>
									</div>

									<div className="col-sm-3">
										<AddExpense
											groupMembers={this.props.groupMembers}
											groupName={this.state.groupName}
											groupId={this.state.groupId}
											method={this.addExpenseData}
										/>
									</div>
								</div>
								{groupExpense && groupExpense.length > 0 ? (
									<div style={{ fontFamily: "Georgia" }}>
										{groupExpense.map((exp) => (
											<div className="list-group" key={exp.expId}>
												<li
													className="list-group-item"
													onClick={() => {
														this.setState({
															visible: true,
															expenseId: exp.expId,
														});
													}}
												>
													<div className="d-flex w-100 justify-content-between">
														<h5 className="mb-1"></h5>
														<h6>{exp.createdAt.split("T")[0]}</h6>
													</div>
													<div className="row">
														<div className="col">
															<p className="mb-1">
																<img
																	src={expensepic}
																	alt="Expense"
																	style={{ height: "50px" }}
																/>
																<strong>{exp.expDesc}</strong>
															</p>

															<div className="col">
																{exp.paidbyUser} paid ${exp.amount}
															</div>
														</div>
													</div>
												</li>
												<div>
													{this.state.visible &&
													this.state.expenseId === exp.expId ? (
														<Comments
															expId={exp.expId}
															expComments={exp.comments}
															expDesc={exp.expDesc}
															groupName={this.state.groupName}
															groupId={this.state.groupId}
														/>
													) : null}
												</div>
											</div>
										))}
									</div>
								) : (
									<div>
										<img
											src={noexp}
											alt="NoExpense"
											style={{ height: "400px" }}
										/>
									</div>
								)}
							</div>
						</div>

						<div className="col-sm-2">
							<GroupBalance groupId={this.state.groupId} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ShowGroup.propTypes = {
	getGroupMembersData: PropTypes.func.isRequired,
	getGroupExpense: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	groupMembers: state.showGroup.groupMembers,
	groupExpenses: state.showGroup.groupExpenses,
});

export default connect(mapStateToProps, {
	getGroupMembersData,
	getGroupExpense,
})(ShowGroup);

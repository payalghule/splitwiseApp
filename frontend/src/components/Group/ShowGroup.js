/* eslint-disable */
import React, { Component } from "react";
import { Redirect } from "react-router";
import update from "react-addons-update";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import AddExpense from "../Expense/AddExpense";
import backendServer from "../../backEndConfig";
import expensepic from "../../images/expensepic.PNG";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroupMembersData } from "../../redux/actions/showGroupActions";
import LeftSidebar from "../Layout/LeftSidebar";
import noexp from "../../images/noexp.PNG";
import "../../App.css";

//to show list of groups
class ShowGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groupName: "",
			groupMembers: [],
			groupExpense: [],
			userId: localStorage.getItem("userid"),
			exitedGroup: 0,
		};
		//this.getGroupMembersData = this.getGroupMembersData.bind(this);
		this.getGroupExpense = this.getGroupExpense.bind(this);
		this.onExitGroup = this.onExitGroup.bind(this);
	}

	componentDidMount() {
		//to get the groupmembers
		const groupNameFromProps = this.props.match.params.groupName;
		const grpData = { gName: groupNameFromProps };
		this.setState({
			groupName: groupNameFromProps,
		});
		console.log("groupData: ", grpData);
		this.props.getGroupMembersData(grpData);
		//this.getGroupExpense(grpData);
	}

	addExpenseData = (expense) => {
		this.setState({
			groupExpense: update(this.state.groupExpense, { $unshift: [expense] }),
		});
	};
	getGroupExpense = (groupData) => {
		//to get the group Expense details
		axios
			.post(`${backendServer}/groups/getgrpexpense`, groupData)
			.then((response) => {
				console.log("response from Axios query", response.data);
				this.setState({
					groupExpense: this.state.groupExpense.concat(response.data),
				});
			})
			.catch((error) => {
				console.log(
					"Expense Data :error occured while connecting to backend:",
					error
				);
			});
	};

	onExitGroup = () => {
		console.log("In Exit Group Handler");
		const groupNameFromProps = this.props.match.params.groupName;
		const userId = this.state.userId;
		const exitData = { groupName: groupNameFromProps, exitUserId: userId };
		console.log("exitData: ", exitData);
		axios
			.post(`${backendServer}/groups/groupexit`, exitData)
			.then((response) => {
				console.log("response from Axios query", response.data);
				if (response.status == 200 && response.data.msg === "EXIT_SUCCESS") {
					alert("Exited the group Successfully");
					//dashboard redirect
					this.setState({
						exitedGroup: 1,
					});
				}
				if (response.status == 200 && response.data.msg === "CLEAR_DUES") {
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
		let gName = this.state.groupName;
		let redirectVar = null;
		let groupExpense = this.state.groupExpense;
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
							<div className="container">
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
											method={this.addExpenseData}
										/>
									</div>
								</div>
								{groupExpense && groupExpense.length > 0 ? (
									<div>
										{groupExpense.map((exp) => (
											<div className="list-group">
												<li className="list-group-item">
													<div className="d-flex w-100 justify-content-between">
														<h5 className="mb-1"></h5>
														<h6>{exp.date}</h6>
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

						<div className="col-sm-2"></div>
					</div>
				</div>
			</div>
		);
	}
}

ShowGroup.propTypes = {
	getGroupMembersData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	groupMembers: state.showGroup.groupMembers,
});

export default connect(mapStateToProps, { getGroupMembersData })(ShowGroup);

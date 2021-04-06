/* eslint-disable */
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import AddExpense from "../Expense/AddExpense";
import backendServer from "../../backEndConfig";
import expensepic from "../../images/expensepic.PNG";
import axios from "axios";
import LeftSidebar from "../Layout/LeftSidebar";
import "../../App.css";

//to show list of groups
class RecentActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: [],
			userId: localStorage.getItem("userid"),
		};

		this.getRecentAcitivityData = this.getRecentAcitivityData.bind(this);
	}

	componentDidMount() {
		//to get the Recent activity
		// this.getRecentAcitivityData();
	}

	getRecentAcitivityData = () => {
		//to get the groupmembers
		axios.defaults.withCredentials = true;
		axios
			.post(`${backendServer}/activity/getactivity`)
			.then((response) => {
				console.log("response from Axios query", response.data);
				this.setState({
					activity: this.state.activity.concat(response.data),
				});
			})
			.catch((error) => {
				console.log(
					"Recent Activity Data: error occured while connecting to backend:",
					error
				);
			});
	};

	render() {
		let actiList = this.state.activity;
		let user = this.state.userId;
		return (
			<div className="dashboard">
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
										<h3>Recent Activity</h3>
									</div>
								</div>
								{actiList && actiList.length > 0 ? (
									<div>
										{actiList.map((activity) =>
											activity.isSettleEntry === 1 ? (
												<div className="list-group list-group-horizontal">
													<li
														className="list-group-item"
														style={{
															fontFamily: "sans-serif",
															fontSize: "20px",
															width: "100%",
														}}
													>
														<strong>{activity.paidBy}</strong> paid $
														{activity.amount} to{" "}
														<strong>{activity.paidTo}</strong> on{" "}
														{activity.date}
													</li>
												</div>
											) : (
												<div className="list-group list-group-horizontal">
													<li
														className="list-group-item"
														style={{
															fontFamily: "sans-serif",
															fontSize: "20px",
															width: "100%",
														}}
													>
														<strong>{activity.paidBy}</strong> added{" "}
														<strong>"{activity.expDesc}"</strong> in{" "}
														<strong>"{activity.groupName}"</strong> on{" "}
														{activity.date}
													</li>
												</div>
											)
										)}
									</div>
								) : (
									<h4 className="alert-success">No Recent Activity to show</h4>
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

export default RecentActivity;

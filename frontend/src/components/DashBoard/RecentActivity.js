/* eslint-disable */
import React, { Component } from "react";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import backendServer from "../../backEndConfig";
import axios from "axios";
import LeftSidebar from "../Layout/LeftSidebar";
import "../../App.css";

class RecentActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: [],
			userId: localStorage.getItem("userid"),
			settle: [],
			curPage: 1,
			pageSize: 2,
		};
	}
	onPage = (e) => {
		console.log("In pagination");
		console.log(e.target);
		console.log(e.target.text);
		this.setState({
			curPage: e.target.text,
		});
	};

	OnChange = (e) => {
		console.log("Inside Onchange");
		this.setState({
			pageSize: e.target.value,
		});
	};

	componentDidMount() {
		document.title = "Recent Activiy";
		const activityInfo = { userId: this.state.userId };
		console.log("activityInfo", activityInfo);
		axios.defaults.withCredentials = true;
		axios
			.post(`${backendServer}/recentactivity/getrecentactivity`, activityInfo)
			.then((response) => {
				console.log("data is", response.data);
				this.setState({
					activity: this.state.activity.concat(response.data),
				});
			})
			.catch((error) => {
				console.log("error occured while connecting to backend:", error);
			});
	}

	render() {
		let items = this.state.activity;

		console.log("Page size:", this.state.pageSize);
		let pgSize = this.state.pageSize;

		let count = 1;
		if (items.length % pgSize == 0) {
			count = pgSize;
		} else {
			count = pgSize + 1;
		}

		console.log("paginate");
		let start = pgSize * (this.state.curPage - 1);
		let end = start + pgSize;
		console.log("start: ", start, ", end: ", end);
		let displayitems = [];
		if (end > items.length) {
			end = items.length;
		}
		for (start; start < end; start++) {
			displayitems.push(items[start]);
		}
		console.log("render");
		console.log("displayitems", displayitems);
		return (
			<div className="dashboard">
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
										<h3>Recent Activity</h3>
										<span>
											<select onChange={this.OnChange}>
												<option>2</option>
												<option>5</option>
												<option>10</option>
											</select>
										</span>
									</div>
								</div>
								{displayitems && displayitems.length > 0 ? (
									<div>
										{displayitems.map((activity) =>
											activity.eventId === 1 ? (
												<div className="list-group list-group-horizontal">
													<li
														className="list-group-item"
														style={{
															fontFamily: "sans-serif",
															fontSize: "20px",
															width: "100%",
														}}
													>
														<strong>{activity.settlededBy}</strong> settled dues
														of ${activity.amount} with{" "}
														<strong>{activity.settleWithUser}</strong>
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
														<strong>{activity.paidBy}</strong> added an expense{" "}
														<strong>"{activity.expDesc}"</strong> of amount $
														{activity.amount} in{" "}
														<strong>"{activity.groupName}"</strong>
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

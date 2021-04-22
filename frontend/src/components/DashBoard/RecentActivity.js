/* eslint-disable */
import React, { Component } from "react";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import backendServer from "../../backEndConfig";
import axios from "axios";
import LeftSidebar from "../Layout/LeftSidebar";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { getRecentActivity } from "../../redux/actions/recentActiActions";
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
			pageSize: parseInt(e.target.value, 10),
		});
	};

	componentWillReceiveProps(nextProps) {
		console.log("nextProps.recentData", nextProps.activityData);

		this.setState({
			activity: this.state.activity.concat(nextProps.activityData),
		});
	}

	componentDidMount() {
		const activityInfo = { userId: this.state.userId };
		this.props.getRecentActivity(activityInfo);
	}

	render() {
		let paginationItemsTag = [];
		let items = this.state.activity;
		let pgSize = this.state.pageSize;
		let active = this.state.curPage;
		let count = 1;

		console.log("Recent activity data is:", items);

		let num = items.length / pgSize;
		console.log(items.length / pgSize);
		console.log(Number.isInteger(items.length / pgSize));
		if (Number.isInteger(num)) {
			count = num;
		} else {
			count = Math.floor(num) + 1;
		}
		console.log("count:", count);
		console.log("items.length:", items.length);

		for (let number = 1; number <= count; number++) {
			paginationItemsTag.push(
				<Pagination.Item key={number} active={number === active}>
					{number}
				</Pagination.Item>
			);
		}

		// console.log("paginate");
		let start = parseInt(pgSize * (this.state.curPage - 1));
		let end = this.state.pageSize + start;
		//   console.log("start: ", start, ", end: ", end);
		let displayitems = [];
		if (end > items.length) {
			end = items.length;
		}
		for (start; start < end; start++) {
			displayitems.push(items[start]);
		}
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
												<div
													className="list-group list-group-horizontal"
													key={activity._id}
												>
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
												<div
													className="list-group list-group-horizontal"
													key={activity._id}
												>
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

							<center>
								<br /> <br /> <br /> <br />
								<br />
								<b /> <br />
								<br />
								<Pagination
									onClick={this.onPage}
									size="lg"
									style={{ display: "inline-flex", color: "#5bc5a7" }}
								>
									{paginationItemsTag}
								</Pagination>
							</center>
						</div>

						<div className="col-sm-2"></div>
					</div>
				</div>
			</div>
		);
	}
}

//export default RecentActivity;
RecentActivity.propTypes = {
	getRecentActivity: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	activityData: state.recentActivity.activityData,
});

export default connect(mapStateToProps, { getRecentActivity })(RecentActivity);

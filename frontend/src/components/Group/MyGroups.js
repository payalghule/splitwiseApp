/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import LeftSidebar from "../Layout/LeftSidebar";
import backendServer from "../../backEndConfig";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllGroups, joinGroup } from "../../redux/actions/myGroupsAction";
import "../../App.css";
//to show list of groups
class MyGroups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allGroupData: [],
			userId: localStorage.getItem("userid"),
			search: "",
		};
		this.groupLoad = this.groupLoad.bind(this);
		this.onJoinClick = this.onJoinClick.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange = (e) => {
		this.setState({ search: e.target.value });
	};
	//To get the all  groups where user is member of those groups
	componentDidMount() {
		const memData = { groupMember: this.state.userId };
		console.log("Member Data : ", memData);
		this.groupLoad(memData);
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps.allGroups", nextProps.allGroups);

		this.setState({
			allGroupData: this.state.allGroupData.concat(nextProps.allGroups),
		});
		console.log("allGroupData:", this.state.allGroupData);
	}

	groupLoad = (memData) => {
		this.props.getAllGroups(memData);
	};
	//to change the isAccepted status true
	onJoinClick = (gName) => {
		// console.log(gName);
		// const groupData = { groupName: gName, groupMember: this.state.userId };
		// axios.defaults.withCredentials = true;
		// axios
		// 	.post(`${backendServer}/groups/joingroup`, groupData)
		// 	.then((response) => {
		// 		console.log("Response after Axios call", response);
		// 		if (response.status == 200 && response.data === "JOINED_GROUP") {
		// 			alert("Joined group successfully!");
		// 			window.location.reload(false);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("error occured while connecting to backend:", error);
		// 	});
	};

	render() {
		console.log("this.state.allGroupData: ", this.state.allGroupData);
		let list = this.state.allGroupData;
		const { search } = this.state;

		const groupList = list.filter((group) => {
			return group.groupName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
		});

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
								<div className="row dashheader align-items-center">
									<div className="col">
										<h3>My Groups</h3>
									</div>
									<div className="col">
										<form className="form-inline my-2 my-lg-0">
											<input
												className="form-control mr-sm-2"
												type="search"
												placeholder="Search"
												aria-label="Search"
												onChange={this.onChange}
											/>
											<button
												className="btn btn-outline-success my-2 my-sm-0"
												type="submit"
											>
												Search
											</button>
										</form>
									</div>
								</div>
								<div>
									{groupList.map((group) =>
										group.isAccepted === 0 ? (
											<div
												className="list-group list-group-horizontal"
												key={group.groupName}
											>
												<Link
													className="list-group-item list-group-item-action disabled"
													style={{ width: "80%", marginRight: "10px" }}
													to={`/groups/${group.groupName}`}
												>
													{group.groupName}
												</Link>

												<span>
													<button
														className="green-button"
														onClick={() => this.onJoinClick(group.groupName)}
													>
														Join Group
													</button>
												</span>
											</div>
										) : (
											<div
												className="list-group list-group-horizontal"
												key={group.groupName}
											>
												<Link
													className="list-group-item list-group-item-action"
													style={{ width: "80%", marginRight: "10px" }}
													to={`/groups/${group.groupName}`}
												>
													{group.groupName}
												</Link>
											</div>
										)
									)}
								</div>
							</div>
						</div>

						<div className="col-sm-2"></div>
					</div>
				</div>
			</div>
		);
	}
}

MyGroups.propTypes = {
	getAllGroups: PropTypes.func.isRequired,
	//	joinGroup: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	allGroups: state.myGroups.allGroups,
	//	groupJoinStatus: state.myGroups.groupJoinStatus,
});

export default connect(mapStateToProps, { getAllGroups })(MyGroups);

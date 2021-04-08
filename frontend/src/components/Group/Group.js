/* eslint-disable */
import React, { Component } from "react";
import { Redirect } from "react-router";
import logo from "../../images/logo.png";
import NavbarDashBoard from "../Layout/NavbarDashboard";
import backendServer from "../../backEndConfig";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import {
	getAllUsers,
	createGroup,
} from "../../redux/actions/createGroupActions";
import "../../App.css";

class Group extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			selectedMembers: [],
			groupName: "",
			selectedValue: [
				{
					_id: localStorage.getItem("userid"),
					username: localStorage.getItem("username"),
					email: localStorage.getItem("email"),
				},
			],
			groupCreatedFlag: 0,
		};
	}

	onSelect = (data) => {
		this.setState({
			selectedMembers: data,
		});
		console.log("selected", this.state.selectedMembers);
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userid");
		let getMemberIdArray = [];
		const listOfMembers = this.state.selectedMembers;
		for (var i = 0; i < listOfMembers.length; i++) {
			getMemberIdArray[i] = listOfMembers[i]._id;
		}
		console.log(getMemberIdArray);

		const newGroupData = {
			groupName: this.state.groupName,
			groupMembers: getMemberIdArray,
			groupCreatedby: userId,
		};
		console.log("Data sending to server from Create Group page:", newGroupData);
		this.props.createGroup(newGroupData);
		// axios.defaults.withCredentials = true;
		// axios
		// 	.post(`${backendServer}/groups/creategroup`, newGroupData)
		// 	.then((response) => {
		// 		console.log("response after post", response);
		// 		if (response.status == 200 && response.data === "GROUP_ADDED") {
		// 			this.setState({
		// 				groupCreatedFlag: 1,
		// 			});
		// 			alert("Group created sucessfully!");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		alert("Group name already exists!");
		// 		console.log("error:", error);
		// 	});
	};

	componentWillMount() {
		this.props.getAllUsers();
		console.log("all users: ", this.props.allUsers);
		// this.setState({
		// 	userData: this.state.userData.concat(nextProps.user),
		// });
		// axios.defaults.withCredentials = true;
		// axios
		// 	.get(`${backendServer}/groups/getUser`)
		// 	.then((response) => {
		// 		console.log("data is", response.data);
		// 		this.setState({
		// 			userData: this.state.userData.concat(response.data),
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log("error occured while connecting to backend:", error);
		// 	});
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps.user", nextProps.allUsers);

		this.setState({
			userData: this.state.userData.concat(nextProps.allUsers),
		});
		console.log("userdata:", this.state.userData);
	}
	render() {
		let details = this.state.userData;
		let redirectVar = null;
		console.log(this.state.groupCreatedFlag);
		if (this.state.groupCreatedFlag) {
			console.log("Redirecting to MyGroups Page...");
			redirectVar = <Redirect to="/MyGroups" />;
		}
		return (
			<div>
				{redirectVar}
				<NavbarDashBoard />
				<div className="container signup-div">
					<div className="row">
						<div className="col">
							<img src={logo} className="logo-signup" alt="logo" />
							<div>
								<label htmlFor="browse"></label>
								<input
									type="file"
									id="profileimg"
									name="profileimg"
									accept="image/*"
									className="browse-grouppic"
								></input>
							</div>
						</div>
						<div className="col">
							<div className="signup-block">
								<h2>START A NEW GROUP</h2>
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="">My group shall be called</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Group Name"
											name="groupName"
											onChange={this.onChange}
											required
										/>
									</div>

									<div className="form-group">
										<h3>ADD GROUP MEMBERS</h3>

										<Multiselect
											options={details} // Options to display in the dropdown
											selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
											onSelect={this.onSelect}
											displayValue="username"
											placeholder="Select Group Members"
											id="multiselect-custom"
											style={{ chips: { background: "#5bc5a7" } }} // Property name to display in the dropdown options
										/>
									</div>

									<button type="submit" className="orange-button">
										Save
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Group.propTypes = {
	getAllUsers: PropTypes.func.isRequired,
	createGroup: PropTypes.func.isRequired,
	allUsers: PropTypes.object.isRequired,
	createGroup: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	allUsers: state.createGroup.allUsers,
	createGroup: state.createGroup.createGroup,
});

export default connect(mapStateToProps, { getAllUsers, createGroup })(Group);

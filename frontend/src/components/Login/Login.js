/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { userLogin } from "../../redux/actions/loginAction";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import NavbarLogin from "../Layout/NavbarLogin";

import "../../App.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		console.log("Client Log: In Login");

		const loginData = {
			email: this.state.email,
			password: this.state.password,
		};

		console.log(loginData);
		this.props.userLogin(loginData);
		this.setState({
			loginFlag: 1,
		});
	};

	render() {
		let redirectVar = null;
		let displayMessage = "";
		if (this.props.user && this.props.user.userid) {
			localStorage.setItem("userid", this.props.user.userid);
			localStorage.setItem("email", this.props.user.email);
			localStorage.setItem("username", this.props.user.username);
			console.log("Redirecting to home");
			redirectVar = <Redirect to="/DashBoard" />;
		} else if (this.props.user) {
			if (this.props.user === "NO_USER" && this.state.loginFlag) {
				displayMessage = "No user with given email id/password";
			} else if (
				this.props.user === "INCORRECT_PASSWORD" &&
				this.state.loginFlag
			) {
				displayMessage = "Password is incorrect";
			}
		}
		return (
			<div>
				{redirectVar}
				<NavbarLogin />
				<div className="container login-div">
					<div className="row">
						<div className="col">
							<img src={logo} className="logo-login" alt="logo" />
						</div>
						<div className="col">
							<div className="signup-block">
								<h2>WELCOME TO SPLITWISE</h2>
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label htmlFor="email">Email Address</label>
										<input
											type="email"
											id="email"
											className="form-control"
											pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
											title="Please enter valid email address"
											required
											onChange={this.onChange}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											className="form-control"
											id="password"
											required
											onChange={this.onChange}
										/>
									</div>
									<button type="submit" className="login-orange-button">
										Log in
									</button>
									<div style={{ color: "#ff0000" }}>{displayMessage}</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	userLogin: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.authuser.user,
	};
};

export default connect(mapStateToProps, { userLogin })(Login);

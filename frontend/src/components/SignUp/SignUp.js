/* eslint-disable */
import React, { Component } from "react";
import userSignup from "../../redux/actions/signupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import logo from "../../images/logo.png";
import "../../App.css";

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSignUp = (e) => {
		e.preventDefault();
		console.log("In handleSignUp");

		const signUpData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		console.log("signup data received in client", signUpData);
		this.props.userSignup(signUpData);
		this.setState({
			signupFlag: 1,
		});
	};

	render() {
		let redirectVar = null;
		let displayMessage = "";
		console.log("this.props.user", this.props.user);
		if (this.props.user) {
			if (this.props.user && this.props.user.userid) {
				console.log("Redirecting to Dashboard");
				localStorage.setItem("userid", this.props.user.userid);
				localStorage.setItem("email", this.props.user.email);
				localStorage.setItem("username", this.props.user.username);
				redirectVar = <Redirect to="/DashBoard" />;
			} else if (this.props.user === "EMAIL_EXIST" && this.state.signupFlag) {
				displayMessage =
					"This Email id is already registered with us, Please use different Email id";
			} else if (this.props.user === "SERVER_ERROR") {
				displayMessage = "Something went wrong";
			}
		}
		return (
			<div className="container signup-div">
				{redirectVar}
				<div className="row">
					<div className="col">
						<img src={logo} className="logo-signup" alt="logo" />
					</div>
					<div className="col">
						<div className="signup-block"></div>
						<h2>INTRODUCE YOURSELF</h2>
						<form onSubmit={this.handleSignUp}>
							<div className="form-group">
								<label htmlFor="username">Hi there! My name is</label>
								<input
									type="text"
									id="username"
									className="form-control"
									required
									onChange={this.onChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">
									Here's my <strong>email address:</strong>
								</label>
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
								<label htmlFor="password">
									And here is my <strong>password:</strong>
								</label>
								<input
									type="password"
									id="password"
									className="form-control"
									required
									onChange={this.onChange}
								/>
							</div>
							<button className="login-orange-button">Sign up</button>
							<div style={{ color: "#ff0000" }}>{displayMessage}</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	userSignup: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		//user: state.signupuser.user,
		user: state.authuser.user,
	};
};

export default connect(mapStateToProps, { userSignup })(SignUp);

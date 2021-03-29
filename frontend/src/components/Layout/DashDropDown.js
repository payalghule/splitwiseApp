/* eslint-disable */
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../redux/actions/loginAction";
import "../../App.css";

class DashDropDown extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleLogout = () => {
    window.localStorage.clear();
    this.props.userLogout();
  };
  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            style={{ color: "white", marginRight: "100px", fontSize: "20px" }}
          >
            Hi, {this.props.user.username}
          </Dropdown.Toggle>
          <Dropdown.Menu id="dropdown-menu-align-right">
            <Dropdown.Item>
              <Link
                to="/Profile"
                className="nav-link"
                style={{ color: "black" }}
              >
                Your Account
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/Group" className="nav-link" style={{ color: "black" }}>
                Create a group
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                to="/MyGroups"
                className="nav-link"
                style={{ color: "black" }}
              >
                My Groups
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link
                to="/"
                className="nav-link"
                onClick={this.props.userLogout}
                style={{ color: "black" }}
              >
                Log Out
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authuser.user,
  };
};
export default connect(mapStateToProps, { userLogout })(DashDropDown);

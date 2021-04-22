/* eslint-disable */
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import DashBoard from "./DashBoard/DashBoard";
import Profile from "./Profile/Profile";
import Group from "./Group/Group";
import MyGroups from "./Group/MyGroups";
import ShowGroups from "./Group/ShowGroup";
import RecentActivity from "./DashBoard/RecentActivity";

const Main = () => {
	return (
		<div>
			<Route exact path="/" component={Landing} />
			<Route path="/SignUp" component={SignUp} />
			<Route path="/Login" component={Login} />
			<Route path="/DashBoard" component={DashBoard} />
			<Route path="/Profile" component={Profile} />
			<Route path="/Group" component={Group} />
			<Route path="/MyGroups" component={MyGroups} />
			<Route path="/groups/:groupName" component={ShowGroups} />
			<Route path="/RecentActivity" component={RecentActivity} />
		</div>
	);
};

export default Main;

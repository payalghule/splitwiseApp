/* eslint-disable */
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import SignUp from "./SignUp/SignUp";
// import Login from './Login/Login';
// import DashBoard from './DashBoard/DashBoard';
// import Profile from './Profile/Profile';
// import Group from './Group/Group';
// import MyGroups from './Group/MyGroups';
// import ShowGroups from './Group/ShowGroup';
// import RecentActivity from './DashBoard/RecentActivity';

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/SignUp" component={SignUp} />
    </div>
  );
};

export default Main;

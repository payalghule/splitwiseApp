import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import groupReducer from "./groupReducer";
import myGroupsReducer from "./myGroupsReducer";
import showGroupReducer from "./showGroupReducer";
import dashboardReducer from "./dashboardReducer";
import recentActiReducer from "./recentActiReducer";

const appReducer = combineReducers({
	authuser: authReducer,
	userProfile: userProfileReducer,
	createGroup: groupReducer,
	myGroups: myGroupsReducer,
	showGroup: showGroupReducer,
	dashboard: dashboardReducer,
	recentActivity: recentActiReducer,
});

const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducer;

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import groupReducer from "./groupReducer";

const appReducer = combineReducers({
	authuser: authReducer,
	userProfile: userProfileReducer,
	createGroup: groupReducer,
});

const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducer;

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import groupReducer from "./groupReducer";

const rootReducer = combineReducers({
	authuser: authReducer,
	userProfile: userProfileReducer,
	createGroup: groupReducer,
});

export default rootReducer;

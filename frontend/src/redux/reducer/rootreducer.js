import { combineReducers } from "redux";
import authReducer from "./authReducer";
//import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  authuser: authReducer,
  //userProfile: userProfileReducer,
});

export default rootReducer;

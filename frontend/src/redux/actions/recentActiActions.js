import { GET_RECENT_ACTI } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getRecentActivity = (activityInfo) => (dispatch) => {
	console.log("Inside getRecentActivity actions");
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["authorization"] = localStorage.getItem(
		"token"
	);
	axios
		.post(`${backendServer}/recentactivity/getrecentactivity`, activityInfo)
		.then((response) => {
			console.log("Actions::response from getRecentActivity", response);
			dispatch({
				type: GET_RECENT_ACTI,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

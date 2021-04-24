import { GET_DASHBOARD_DATA } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getDashData = (memData) => (dispatch) => {
	console.log("Inside getDashData actions");
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["authorization"] = localStorage.getItem(
		"token"
	);
	axios
		.post(`${backendServer}/dashboard/getdashdata`, memData)
		.then((response) => {
			console.log("Actions::response from getDashData", response.data);
			dispatch({
				type: GET_DASHBOARD_DATA,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

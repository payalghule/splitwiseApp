import { GET_GROUP_BAL } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getGroupBalance = (memData) => (dispatch) => {
	console.log("Inside getallgroups actions");
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groupbalance/getgroupbalance`, memData)
		.then((response) => {
			console.log("Actions::response from getallgroups", response.data);
			dispatch({
				type: GET_GROUP_BAL,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

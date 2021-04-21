import { GET_GROUP_MEMBERS, GET_GROUP_EXPS } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getGroupMembersData = (memData) => (dispatch) => {
	console.log("Inside getGroupMembersData actions");
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groups/getgroupmembs`, memData)
		.then((response) => response.data)
		.then((members) => {
			console.log("Actions::response from getgroupmembs", members);
			dispatch({
				type: GET_GROUP_MEMBERS,
				payload: members,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const getGroupExpense = (memData) => (dispatch) => {
	console.log("Inside getGroupExpense actions");
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groups/getgroupexpense`, memData)
		.then((response) => response.data)
		.then((exps) => {
			console.log("Actions::response from getgrpexpense", exps);
			dispatch({
				type: GET_GROUP_EXPS,
				payload: exps,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

import { GET_ALL_GROUPS, JOIN_GROUP } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getAllGroups = (memData) => (dispatch) => {
	console.log("Inside getallgroups actions");
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groups/getallgroups`, memData)
		.then((response) => {
			console.log("Actions::response from getallgroups", response.data);
			dispatch({
				type: GET_ALL_GROUPS,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const joinGroup = (groupData) => (dispatch) => {
	console.log("Inside joinGroup actions");
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groups/joingroup`, groupData)
		.then((response) => {
			console.log("Actions::response from joinGroup", response.data);
			if (response.status === 200) {
				alert("Group joined successfully!");
			}
			dispatch({
				type: JOIN_GROUP,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

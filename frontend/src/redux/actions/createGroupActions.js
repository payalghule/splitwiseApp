import { GET_ALL_USER, CREATE_GROUP } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getAllUsers = () => (dispatch) => {
	console.log("Inside create group actions");
	axios.defaults.withCredentials = true;
	axios
		.get(`${backendServer}/groups/getallusers`)
		.then((response) => {
			console.log("response from get User Emails", response.data);
			dispatch({
				type: GET_ALL_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const createGroup = (groupDetails) => (dispatch) => {
	console.log("group Data in actions is", groupDetails);
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/groups/creategroup`, groupDetails)
		.then((response) => {
			console.log("response for update profile is", response.status);
			if (response.status === 200) {
				alert("Group created successfully!");
			} else if (response.status === 299) {
				alert("Group Name Already Exixts! Please select another name");
			} else if (response.status === 500) {
				alert("Server Error");
			} else {
				alert("Unable to create group");
			}
			return dispatch({
				type: CREATE_GROUP,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

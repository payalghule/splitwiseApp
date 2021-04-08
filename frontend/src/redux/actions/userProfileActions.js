import { GET_USER, UPDATE_USER } from "./types";
import backendServer from "../../backEndConfig";
import axios from "axios";

export const getUser = (user) => (dispatch) => {
	axios
		.post(`${backendServer}/profile/getuserprofile`, user)
		.then((response) => {
			console.log("Received response from server:", response);
			return dispatch({
				type: GET_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const updateUser = (userProfileData) => (dispatch) => {
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendServer}/profile/updateuser`, userProfileData)
		.then((response) => {
			console.log("response for update profile is", response);
			if (response.status === 200) {
				alert("User Profile updated successfully!");
			} else if (response.status === 209) {
				alert("Update Failed! Please Try Again");
			} else if (response.status === 207) {
				alert("No User Found");
			} else {
				alert("Server Error!");
			}
			return dispatch({
				type: UPDATE_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

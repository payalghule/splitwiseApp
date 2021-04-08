import { GET_ALL_USER, CREATE_GROUP } from "../actions/types";

const initialState = {
	allUsers: {},
	createGroup: {},
};

export default function groupReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_USER:
			return {
				...state,
				allUsers: action.payload,
			};
		case CREATE_GROUP:
			return {
				...state,
				createGroup: action.payload,
			};
		default:
			return state;
	}
}

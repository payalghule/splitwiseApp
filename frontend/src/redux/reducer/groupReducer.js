import { GET_ALL_USER, CREATE_GROUP } from "../actions/types";

const initialState = {
	allUsers: {},
	groupCreation: {},
};

export default function groupReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_USER:
			return {
				...state,
				allUsers: action.payload,
				groupCreation: null,
			};
		case CREATE_GROUP:
			return {
				...state,
				groupCreation: action.payload,
			};
		default:
			return state;
	}
}

import { GET_GROUP_MEMBERS } from "../actions/types";

const initialState = {
	groupMembers: {},
};

export default function showGroupReducer(state = initialState, action) {
	switch (action.type) {
		case GET_GROUP_MEMBERS:
			return {
				...state,
				groupMembers: action.payload,
			};

		default:
			return state;
	}
}

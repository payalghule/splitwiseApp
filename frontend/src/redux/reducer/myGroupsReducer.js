import { GET_ALL_GROUPS, JOIN_GROUP } from "../actions/types";

const initialState = {
	allGroups: {},
	groupJoinStatus: {},
};

export default function myGroupsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_GROUPS:
			return {
				...state,
				allGroups: action.payload,
				groupJoinStatus: null,
			};
		case JOIN_GROUP:
			return {
				...state,
				groupJoinStatus: action.payload,
			};
		default:
			return state;
	}
}

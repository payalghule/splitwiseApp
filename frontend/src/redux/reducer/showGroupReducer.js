import { GET_GROUP_MEMBERS, GET_GROUP_EXPS } from "../actions/types";

const initialState = {
	groupMembers: {},
	groupExpenses: {},
};

export default function showGroupReducer(state = initialState, action) {
	switch (action.type) {
		case GET_GROUP_MEMBERS:
			return {
				...state,
				groupMembers: action.payload,
			};

		case GET_GROUP_EXPS:
			return {
				...state,
				groupExpenses: action.payload,
			};
		default:
			return state;
	}
}

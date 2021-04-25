import { GET_GROUP_BAL } from "../actions/types";

const initialState = {
	groupBalData: {},
};

export default function groupBalanceReducer(state = initialState, action) {
	switch (action.type) {
		case GET_GROUP_BAL:
			return {
				...state,
				groupBalData: action.payload,
			};

		default:
			return state;
	}
}

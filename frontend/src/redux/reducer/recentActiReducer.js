import { GET_RECENT_ACTI } from "../actions/types";

const initialState = {
	activityData: {},
};

export default function recentActiReducer(state = initialState, action) {
	switch (action.type) {
		case GET_RECENT_ACTI:
			return {
				...state,
				activityData: action.payload,
			};

		default:
			return state;
	}
}

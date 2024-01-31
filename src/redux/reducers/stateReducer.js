import { FETCH_STATES } from "../actions/types";

const initialState = [];

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATES:
            return action.payload;

        default:
            return state;
    }
};

export default stateReducer;
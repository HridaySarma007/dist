import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import stateReducer from "./stateReducer";

export const reducers = combineReducers({
  auth: authReducer,
  states: stateReducer,
  message: messageReducer,
});

export default reducers;

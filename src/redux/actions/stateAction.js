import { FETCH_STATES, SET_MESSAGE } from "./types";
import config from "../../utils/config";
import axios from "axios";

export const fetchStates = () => async (dispatch) => {
    try {
        const res = await axios.get("https://address.ttsec.co.in/states");
        console.log(res);

        dispatch({ type: FETCH_STATES, payload: res.data });

    } catch (err) {
        console.log(err)
    }
};

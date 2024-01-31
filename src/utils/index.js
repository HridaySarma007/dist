import axios from "axios";
import config from "./config";

export default axios.create({
  baseURL: config.SOILCARE_API,
});


export const boxShadow = "0px 0px 2px 0px #888888";

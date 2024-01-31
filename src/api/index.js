import api from "../utils/index";
import authHeader from "../utils/auth-header";

export const fetchNR = async function ({ id, corp, target, method }) {
    const response = await api.get(
        `nutrient-requirements?test-id=${id}&corp=${corp}&target=${target}&method=${method}`,
        { headers: authHeader() }
    );
    const { targets, nutrientRequirements, testResult } = response.data.data;
    const dataUnits = response.data.dataUnits;
    return { targets, nutrientRequirements, testResult, dataUnits };
}

export const fetchCustomerById = async function (customerId) {
    const response = await api.get("customers/" + customerId, {
        headers: authHeader(),
    });
    return response.data.data;
}

export const fetchUserById = async function (userId) {
    const response = await api.get("users/" + userId, {
        headers: authHeader(),
    });
    return response.data.data;
}

export const fetchReport = async function ({ id }) {
    console.log(id)
    const res = await api.get(`test-results/tea/${id}`, {
        headers: authHeader(),
    });
    return res.data;
};

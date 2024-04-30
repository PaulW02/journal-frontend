import Keycloak from "keycloak-js";
import {userService} from "./UserService.js";

const serverUrl = "http://localhost:8000";

const _kc = new Keycloak({
    realm: "Journal",
    url: "http://localhost:8181/",
    "ssl-required": "external",
    resource: "journal-frontend",
    clientId: "journal-frontend",
    "enable-cors": true,
    "cors-max-age": 1000,
    "cors-allowed-methods": "POST, PUT, DELETE, GET, OPTIONS",
    "confidential-port": 0
});

const getPatientDetails = async (patientId) => {
    const token = userService.getToken();

    if (!token) {
        throw new Error("Missing access token for API call");
    }

    const url = `${serverUrl}/api/patient/retrieve/${patientId}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching patient details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

const getAllPatients = async () => {
    const token = userService.getToken();

    if (!token) {
        throw new Error("Missing access token for API call");
    }

    const url = `${serverUrl}/api/patient/all`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching patients: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};
const retrieveAllPatients = async () => {
    const token = userService.getToken();

    if (!token) {
        throw new Error("Missing access token for API call");
    }

    const url = `${serverUrl}/api/patient/retrieve/all`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching patients: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const patientService = {
    getPatientDetails,
    retrieveAllPatients,
    getAllPatients
}
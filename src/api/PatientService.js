import Keycloak from "keycloak-js";
import {userService} from "./UserService.js";

const serverReadUrl = "http://localhost:8000";
const serverWriteUrl = "http://localhost:8001";

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

    const url = `${serverReadUrl}/api/patient/retrieve/${patientId}`;
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

    const url = `${serverReadUrl}/api/patient/all`;
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

const createPatient = async (newPatientData) => {
    const token = userService.getToken();

    if (!token) {
        throw new Error("Missing access token for API call");
    }

    const url = `${serverWriteUrl}/api/patient/`;
    const response = await fetch(url, {
        method: 'POST', // Specify POST method for creating
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type for JSON data
        },
        body: JSON.stringify(newPatientData) // Send newPatientData as JSON
    });

    if (!response.ok) {
        throw new Error(`Error creating patient: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

const addCondition = async (condition, patientId) => {

    const token = userService.getToken();

    if (!token) {
        throw new Error("Missing access token for API call");
    }
    const url = `${serverWriteUrl}/api/condition/`;


    const bodyData = {
        condition: condition,
        patientId: patientId
    };

    const response = await fetch(url, {
        method: 'POST', // Specify POST method for creating
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type for JSON data
        },
        body: JSON.stringify(bodyData) // Send bodyData as JSON
    });

    if (!response.ok) {
        throw new Error(`Error creating patient: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const patientService = {
    getPatientDetails,
    getAllPatients,
    createPatient,
    addCondition
}
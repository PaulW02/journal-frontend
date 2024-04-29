import Keycloak from "keycloak-js";

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


const initKeycloak = (onAuthenticatedCallback) => {
    _kc
        .init({
            onLoad: "login-required",
        })
        .then((authenticated) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = () => _kc.updateToken(10);

const getParsedToken = () => _kc.tokenParsed;

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getSub = () => _kc.tokenParsed?.sub;

const getFullName = () =>
    _kc.tokenParsed?.given_name + " " + _kc.tokenParsed?.family_name;

const getEmail = () => _kc.tokenParsed?.email;

const getNameAndEmail = () => getFullName() + ", " + getEmail();

const hasRole = (role) => {
    let roles = getRoles();
    for (var i = 0; i < roles.length; i++) {
        if (roles[i] === role) return true;
    }
    return false;
};

const isDoctor = () => {
    return hasRole("role_doctor");
}

const isEmployee = () => {
    return hasRole("role_employee");
}

const isPatient = () => {
    return hasRole("role_patient");
}

const getRoles = () => _kc.tokenParsed?.realm_access.roles;

export const userService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    getSub,
    getFullName,
    getEmail,
    getNameAndEmail,
    getRoles,
    isDoctor,
    isPatient,
    isEmployee,
    hasRole
}
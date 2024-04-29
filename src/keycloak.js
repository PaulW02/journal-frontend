import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8181",
    realm: "Journal",
    clientId: "journal-frontend",
});

export default keycloak;
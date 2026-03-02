import sendRequest from "./send-request";
const BASE_URL = "/api/users";
const MFA_BASE_URL = "/api/mfa";
const OAUTH_BASE_URL = "/api/oauth";

export async function signup(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export async function verifyMfaLogin(codes) {
  return sendRequest(`${MFA_BASE_URL}/verify`, "POST", codes);
}
export async function oauthLogin(credentials) {
  return sendRequest(`${OAUTH_BASE_URL}/login`, "POST", credentials);
}

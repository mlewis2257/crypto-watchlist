import sendRequest from "./send-request";
const OAUTH_BASE_URL = "/api/oauth";

export async function initiateGoogleAuth() {
  // Redirect to backend OAuth initiation
  window.location.href = `${OAUTH_BASE_URL}/google`;
}

export async function handleOAuthCallback(code) {
  // backend exchanges code for tokens
  return sendRequest(`${OAUTH_BASE_URL}/callback`, "POST", { code });
}

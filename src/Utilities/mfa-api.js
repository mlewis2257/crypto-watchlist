import sendRequest from "./send-request";
const MFA_BASE_URL = "/api/mfa";

export async function initiateMFASetup() {
  // get QR code and secret for authenticator app
  return sendRequest(`${MFA_BASE_URL}/setup`, "POST");
}

export async function verifyMfaSetup(token) {
  // Verify the 6-digit code from authenticator app
  return sendRequest(`${MFA_BASE_URL}/verify`, "POST", { token });
}

export async function disableMfa(password) {
  // Disable MFA (requires password verification)
  return sendRequest(`${MFA_BASE_URL}/disable`, "POST", { password });
}

export async function sendMfaBackupCodes() {
  // Generate new backup
  return sendRequest(`${MFA_BASE_URL}/backup-codes`, "POST");
}

import * as mfaAPI from "./mfa-api";

export async function setupMfa() {
  const { qrcode, secret, backupCodes } = await mfaAPI.initiateMFASetup();

  localStorage.setItem("mfa_temp_secret", secret);

  return {
    qrcode,
    secret,
    backupCodes: backupCodes || [],
  };
}

export async function verifySetup(token) {
  const response = await mfaAPI.verifyMfaSetup(token);

  // Clear temporary secret after successful setup
  localStorage.removeItem("mfa_temp_secret");

  return response;
}

export async function disableMfa(password) {
  const response = await mfaAPI.disableMfa(password);

  // Clear any MFA-related local data
  localStorage.removeItem("mfa_temp_secret");
  localStorage.removeItem("mfa_backup_codes");

  return response;
}

export function generateBackupCodes() {
  // generate backup codes for emergency access
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(Math.random().toString(36).substring(2, 8).toUpperCase());
  }
  localStorage.setItem("mfa_backup_codes", JSON.stringify(codes));
  return codes;
}

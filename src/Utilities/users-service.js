import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signup(userData);
  setToken(token);
  return getUser();
}
export async function login(credentials) {
  const response = await usersAPI.login(credentials);

  // handle MFA Requirement
  if (response.requiresMfa) {
    return {
      success: false,
      requiresMfa: true,
      tempToken: response.tempToken,
    };
  }
  // Regular login - store token
  await setToken(response.token);
  return getUser();
}

export async function completeMfaLogin(tempToken, mfaCode) {
  const response = await usersAPI.verifyMfaLogin(tempToken, mfaCode);
  await setToken(response.token);
  return getUser();
}

export async function loginWithOAuth(oauthData) {
  const response = await usersAPI.oauthLogin(oauthData);
  await setToken(response.token);
  return getUser();
}

export async function logOut() {
  localStorage.removeItem("token");
}

export async function setToken(token) {
  if (!token) {
    localStorage.removeItem("token");
    return;
  }

  localStorage.setItem("token", token);

  // store additional token metadata
  const payload = parseJwtPayload(token);
  localStorage.setItem("token_exp", payload.exp.toString());
  localStorage.setItem("token_user_id", payload.user.id.toString());
}

export async function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Check expiration
  const exp = parseInt(localStorage.getItem("token_exp") || "0");
  if (exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("token_user_id");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  const payload = parseJwtPayload(token);

  return payload.user;
}

// OAuth help functions
export function parseOAuthResponse(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  const code = params.get("code");
  const state = params.get("state");

  return { code, state };
}

export function parseJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed Parsing JWT", error);
    return null;
  }
}

// MFA Helpers
export function isMfaEnabled() {
  const user = getUser();
  return user?.mfaEnabled || false;
}

export function getMfaBackupCodes() {
  const codes = localStorage.getItem("mfa_backup_codes");
  return codes ? JSON.parse(codes) : [];
}

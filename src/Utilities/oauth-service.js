import * as oauthAPI from "./oauth-api";
import { getToken, getUser } from "./users-service";

export async function loginWithGoogle() {
  await oauthAPI.initiateGoogleAuth();
}

export async function handleOAuthCallback(code) {
  // OAuth callback with code from Google
  const token = await oauthAPI.handleOAuthCallback(code);
  await getToken(token);
  return getUser();
}

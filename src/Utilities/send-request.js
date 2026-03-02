import { getToken } from "./users-service";
import "axios";

export default async function sendRequest(url, method = "GET", payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, specifiy the method, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    // options.headers = {};
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // if res.ok is false then something went wrong
  if (res.ok) {
    const contentType = res.headers.get("content-type");

    // handle different response types
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      return res.text();
    }
  }
  throw new Error(`Request failed: ${res.status} ${res.statusText}`);
}

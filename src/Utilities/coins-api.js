import sendRequest from "./send-request";
const BASE_URL = "/api/cryptoCurrency";

export async function getAll() {
  return sendRequest(BASE_URL);
}

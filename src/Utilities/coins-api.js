import sendRequest from "./send-request";
const BASE_URL = "/api/cryptoCurrency";

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getMarketData(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function getArticleData(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function getNews() {
  return sendRequest(BASE_URL);
}

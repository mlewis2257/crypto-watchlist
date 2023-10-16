const CMC_API_KEY = process.env.REACT_APP_CMC_API_KEY;
const axios = require("axios");

module.exports = {
  index,
};

async function index(req, res) {
  try {
    let response = await axios.get(
      "https://openapiv1.coinstats.app/news?from=2023-04-20T12%3A09%3A03.692Z&to=2023-10-14T14%3A09%3A03.692Z",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": CMC_API_KEY,
        },
      }
    );
    console.log(response.data);
    res.json(response.data.result);
  } catch (error) {
    // error
    console.log(error);
  }
}

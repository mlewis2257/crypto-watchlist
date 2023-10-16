const { response } = require("express");
const CryptoCurrency = require("../../models/cryptoCurrency");
const CMC_API_KEY = process.env.REACT_APP_CMC_API_KEY;
const axios = require("axios");

module.exports = {
  index,
  getData,
  getArticle,
};

async function index(req, res) {
  console.log(CMC_API_KEY);
  try {
    let response = await axios.get("https://openapiv1.coinstats.app/coins", {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "rlOwcaJ1kA98uJN4X+eL/+TRcGE83VEWmgp4v8NF2m8=",
      },
    });
    console.log(response.data);
    res.json(response.data.result);
  } catch (error) {
    // error
    console.log(error);
  }
}

async function getData(req, res) {
  try {
    let response = await axios.get(
      `https://openapiv1.coinstats.app/coins/${req.params.id}/charts?period=1y`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "rlOwcaJ1kA98uJN4X+eL/+TRcGE83VEWmgp4v8NF2m8=",
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function getArticle(req, res) {
  try {
    let response = await axios.get(
      `https://openapiv1.coinstats.app/news/search?limit=5&query=${req.params.id}&orderBy=RELEVANCE&to=2023-10-14T14%3A09%3A03.707Z`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "rlOwcaJ1kA98uJN4X+eL/+TRcGE83VEWmgp4v8NF2m8=",
        },
      }
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}

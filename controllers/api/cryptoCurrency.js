const { response } = require("express");
const CryptoCurrency = require("../../models/cryptoCurrency");
const CMC_API_KEY = process.env.REACT_APP_CMC_API_KEY;
const axios = require("axios");

module.exports = {
  index,
  show,
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

async function show(req, res) {
  try {
    let response = await axios.get(
      `https://openapiv1.coinstats.app/coins/coinId/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "rlOwcaJ1kA98uJN4X+eL/+TRcGE83VEWmgp4v8NF2m8=",
        },
      }
    );
    res.json(response.data.result);
  } catch (error) {
    console.log(error);
  }
}

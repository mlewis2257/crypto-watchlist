const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cryptoCurrencySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    circulatingSupply: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CryptoCurrency", cryptoCurrencySchema);

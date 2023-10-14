const mongoose = require("mongoose");
const cryptoCurrency = require("./cryptoCurrency");
const Schema = mongoose.Schema;

const cryptoListSchema = new Schema({
  qty: {
    type: Number,
    default: 1,
  },
  crypto: cryptoCurrencySchema,
});

const watchlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cryptoList: [cryptoListSchema],
});

module.exports = mongoose.model("Watchlist", watchlistSchema);

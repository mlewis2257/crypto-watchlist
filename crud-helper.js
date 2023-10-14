require("dotenv").config();
require("./config/database");

const User = require("./models/user");
// const Watchlist = require(./models/watchlist)
// const CryptoCurrency = require(./models/cryptocurrency)
// const PriceData = require(./models/pricedata)
// const UserNotifications = require(./models/usernotifications)
// const UserActivityLog = require(./models/useractivitylog)
// const UserSettings = require(./models/usersettings)

let user,
  watchlist,
  cryptocurrency,
  pricedata,
  usernotifications,
  useractivitylog,
  usersettings;
let users,
  watchlists,
  cryptocurrencys,
  pricedatas,
  usersnotifications,
  usersactivitylog,
  userssettings;

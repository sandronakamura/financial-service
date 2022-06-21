const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  clientid: { type: String, required: true, unique: true },
  bankname: { type: String, required: true },
  typeaccount: { type: String, required: true },
  ownername: { type: String, required: true },
  cardlimit: { type: String, required: true },
  apikey: { type: String, required: true },
});

module.exports = mongoose.model("Financial", schema);

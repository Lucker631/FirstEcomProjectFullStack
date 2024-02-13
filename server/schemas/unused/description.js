const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  //   descriptionImage: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("description", descriptionSchema);

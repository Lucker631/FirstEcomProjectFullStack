const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  image: [
    {
      photo_url: {
        type: String,
        unique: true,
        required: true,
      },
      public_id: {
        type: String,
        unique: true,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("product", productSchema);

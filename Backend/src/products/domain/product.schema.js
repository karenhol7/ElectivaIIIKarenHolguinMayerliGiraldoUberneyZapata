const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  
  name: {
    type: String,
    unique: true
  },

  description: {
    type: String,
  },

  rate: {
    type: Number,
  },

  category: {
    type: String,
  },

  url: {
    type: String,
  },

  image: {
    type: String
  },

  tags: [
    {
      type: String,
    },
  ],

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
});

module.exports = {
  productSchema,
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: "Product" 
},

  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
},

  content: {
    type: String,
  },

  rate: {
    type: Number,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
});

module.exports = { commentSchema };

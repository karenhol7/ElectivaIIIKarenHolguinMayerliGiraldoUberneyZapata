const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
      },
    
      email: {
        type: String,
        unique: true,
        required: true
      },
    
      password: {
        type: String,
        required: true
      },

      bio: {
        type: String,
      },

      avatar: {
        type: String,
      },    
    
      createdAt: {
        type: Date,
      },
    
      updatedAt: {
        type: Date,
      },
})

module.exports = {
  userSchema,
};
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    
    },
    email: {
      type: String,
    
    },
    message: {
      type: String,
    
    },
   
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema)
module.exports = Feedback
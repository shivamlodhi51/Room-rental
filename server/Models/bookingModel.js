const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      ref: "User",
    },
    customerId: {
      type: String,
      ref: "User",
    },
    customerFirstName: {
      type: String,
      ref: "User",
    },
    customerLastName: {
      type: String,
      ref: "User",
    },
    status:{
      type: String,
      default:"Panding"
    },
    hostId: {
      type: String,
      ref: "User",
    },
    listingId: {
      type: String,
      ref: "Listing",
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema)
module.exports = Booking
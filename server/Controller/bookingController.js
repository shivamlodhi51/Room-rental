const Booking = require("../Models/bookingModel");
const { v4: uuidv4 } = require('uuid');

const CreateBooking = async (req, res) => {
    try {
        const { customerId,customerFirstName, customerLastName, listingPhotoPaths, hostId, listingId, startDate, endDate, totalPrice } = req.body;
        const bookingId = uuidv4();
        const newBooking = new Booking({bookingId, customerId, customerFirstName, customerLastName, listingPhotoPaths,  hostId, listingId, startDate, endDate, totalPrice })
        await newBooking.save()
        res.status(200).json(newBooking);
    } catch (error) {
        console.log(err);
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
    }
}
const Resarvation = async (req, res) => {
    try {
      const { userId } = req.params;
      const listing = await Booking.find({ hostId: userId });
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }

  const TripList = async (req, res) => {
    try {
      const { userId } = req.params;
      const listing = await Booking.find({ customerId: userId });
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }

  const Cancel = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const {status} = req.body
      const listing = await Booking.findOneAndUpdate({ bookingId: bookingId  },{status});
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }

  const BookingDelete = async (req, res) => {
    try {
      const { bookingId } = req.params;
      // const {status} = req.body
      const listing = await Booking.findOneAndDelete({ bookingId: bookingId  });
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }


  const Bookinglist = async (req, res) => {
    try {
      // const { userId } = req.params;
      const listing = await Booking.find();
      res.status(202).json(listing)
    } catch (err) {
      res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
  }


module.exports = {CreateBooking , Resarvation, TripList, Cancel, Bookinglist, BookingDelete};
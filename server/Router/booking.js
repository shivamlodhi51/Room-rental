const router = require("express").Router();
const {CreateBooking, Resarvation, TripList, Cancel, BookingDelete, Bookinglist} = require('../Controller/bookingController')

router.post("/create",CreateBooking);
router.get("/reservation/:userId",Resarvation);
router.get("/trip/:userId",TripList);

router.patch("/patch/:bookingId",Cancel);
router.get("/all", Bookinglist);
router.delete("/delete/:bookingId", BookingDelete);

module.exports = router;
import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [reservationList, setReservationList] = useState([]);

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/reservation/${user.userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setReservationList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  const updateReservationStatus = (bookingId, newStatus) => {
    setReservationList((prevList) =>
      prevList.map((reservation) =>
        reservation.bookingId === bookingId
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(
          ({
            listingId,
            bookingId,
            listingPhotoPaths,
            hostId,
            startDate,
            endDate,
            totalPrice,
            status,
            booking = true,
            reservation = true,
          }) => (
            <ListingCard
              key={bookingId}
              listingId={listingId.listingId}
              creator={hostId.hostId}
              listingPhotoPaths={listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
              bookingId={bookingId}
              reservation={reservation}
              status={status}
              onUpdateStatus={updateReservationStatus}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;

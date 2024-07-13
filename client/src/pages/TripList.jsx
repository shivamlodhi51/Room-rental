import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const [tripList, setTripList] = useState([]);
  const { user } = useAuth();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/trip/${user.userId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setTripList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  const updateTripStatus = (bookingId, newStatus) => {
    setTripList((prevList) =>
      prevList.map((trip) =>
        trip.bookingId === bookingId ? { ...trip, status: newStatus } : trip
      )
    );
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(
          ({
            bookingId,
            listingPhotoPaths,
            listingId,
            hostId,
            city,
            status,
            province,
            country,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              key={bookingId}
              bookingId={bookingId}
              listingId={listingId}
              creator={hostId}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
              status={status}
              onUpdateStatus={updateTripStatus}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;

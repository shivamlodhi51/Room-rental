import React, { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [host, setHost] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setListing(data[0]);
        setLoading(false);
      } else {
        console.log("No data found");
      }
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  const fetchHostDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/getuser/${listing.creator}`,
        {
          method: "GET",
        }
      );

      const userData = await response.json();
      setHost(userData);
    } catch (err) {
      console.log("Fetch Host Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  useEffect(() => {
    if (listing) {
      fetchHostDetails();
    }
  }, [listing]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const customerId = user.userId;
  const customerFirstName = user.firstName;
  const customerLastName = user.lastName;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        customerFirstName,
        customerLastName,
        listingId,
        listingPhotoPaths: listing.listingPhotoPaths,
        hostId: listing.creator,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt={`listing photo ${index}`}
            />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />
        <div className="profile">
          <h3>
            {/* Hosted by {host && `${host.firstName} ${host.lastName}`} */}
          </h3>
        </div>
        {/* <hr /> */}
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="amenities">
                {listing.amenities[0].split(",").map((item, index) => (
                  <div className="facility" key={index}>
                    <div className="facility_icon">
                      {
                        facilities.find(
                          (facility) => facility.name === item
                        )?.icon
                      }
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              <h2>
                Total price: &#x20B9;{listing.price * dayCount}
              </h2>
              <p>
                Start Date: {dateRange[0].startDate.toDateString()}
              </p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>
              <button
                className="button"
                type="submit"
                onClick={handleSubmit}
              >
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;

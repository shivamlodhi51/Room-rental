import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./axios";
// import { useDispatch, useSelector } from "react-redux";


const Listings = () => {

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to fetch listings from the server
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties/category/${selectedCategory}`
          : "http://localhost:3001/properties/all",
        {
          method: "GET",
        }
      );
  
      const data = await response.json();
      setListings(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  // Function to periodically fetch listings
  const fetchListingsPeriodically = () => {
    // Fetch listings initially
    getFeedListings();
    // Fetch listings periodically every 10 seconds (adjust as needed)
    const intervalId = setInterval(getFeedListings, 10000);
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  };
  
  useEffect(() => {
    // Start fetching listings periodically when component mounts
    const intervalId = fetchListingsPeriodically();
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [selectedCategory]); // Re-fetch listings when selectedCategory changes

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              listingId,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false,
              normal=true
            }) => (
              <ListingCard
                key={listingId} // Added key prop
                listingId={listingId}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                normal={normal}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;

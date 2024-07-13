import "../styles/List.scss";
// import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
// import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"
import { useAuth } from "../store/auth";

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  // const user = useSelector((state) => state.user)
  const { user } = useAuth();
  // const propertyList = user.propertyList([]);
  const [propertyList, dsetPropertyList] = useState([]);
  console.log(user)

  // const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/users/${user.userId}`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dsetPropertyList(data)
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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
            booking = false,
            property = true,
          }) => (
            <ListingCard
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
              property={property}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
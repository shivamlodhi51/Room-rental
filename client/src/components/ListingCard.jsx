import { useState } from "react";
import "../styles/ListingCard.scss";
import axios from 'axios';
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,    
  totalPrice,
  booking,
  reservation,
  property,
  bookingId,
  status,
  normal,
  onUpdateStatus,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ADD TO WISHLIST */

  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?.userId === listingId);

  const patchWishList = async () => {
    if (user?.userId !== creator.userId) {
      const response = await fetch(
        `http://localhost:3001/user/user${user?.userId}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

    } else { return }
  };

  const patchCancel = ( bookingId ) => {
    axios.patch(`http://localhost:3001/bookings/patch/${bookingId}`, {
      status: "Cancel"
    })
      .then((res) => {
        console.log("Booking status updated successfully:", res.data);
        onUpdateStatus(bookingId, "Cancel");
        if (res) {
          // navigate(`/${user.userId}/trips`);
        }
        // You may perform any additional actions here upon successful update
      })
      .catch((err) => {
        console.error("Error updating booking status:", err);
        // You may display a user-friendly error message here
        // For example: alert("Failed to update booking status. Please try again later.");
      });
      
  }

  const patchAccept = (bookingId) => {
    axios.patch(`http://localhost:3001/bookings/patch/${bookingId}`, {
      status: "Accept"
      
    })
      .then((res) => {
        // {`/${user.userId}/reservations`}
        console.log("Booking status updated successfully:", res.data);
        onUpdateStatus(bookingId, "Accept");
        // You may perform any additional actions here upon successful update
      })
      .catch((err) => {
        console.error("Error updating booking status:", err);
        // You may display a user-friendly error message here
        // For example: alert("Failed to update booking status. Please try again later.");
      });
      
  }
  

  const deleteProperty = (listingId) => {
    axios.delete(`http://localhost:3001/properties/delete/${listingId}`, {
      // status: "Accept"
    })
      .then((res) => {
        console.log("property deleted successfully:", res.data);
        // You may perform any additional actions here upon successful update
      })
      .catch((err) => {
        console.error("Error Deleting:", err);
        // You may display a user-friendly error message here
        // For example: alert("Failed to update booking status. Please try again later.");
      });
  }

  // const patchCancel = () => { alert('Button clicked'); }

  // const patchCancel = async () => {
  //   if (user?.userId !== creator.userId) {
  //     const response = await fetch(
  //       `http://localhost:3001/user/user${user?.userId}/${listingId}`,
  //       {
  //         method: "PATCH",
  //         header: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     // setWishList(data.wishList);
  //   } else { return }
  // };


  return (
    <div
  className="listing-card"
  {...(normal
    ? { onClick: () => navigate(`/properties/${listingId}`) }
    : {})}
>
      <div className="slider-container" >
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!booking ? (
        <>
          <h3>
            {city}, {province}, {country}
          </h3>
          <p>{category}</p>
        </>
      ) : (
        <>

        </>
      )}


      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>&#8377; {price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>&#8377; {totalPrice}</span> total
          </p>
        </>
      )}


      {/* <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button> */}

      {!booking ? (
        <></>
      ) : (

        <button className="cancel-btn float-end btn-outline-danger"
          onClick={()=>patchCancel(bookingId)}
        >
          Cancel
        </button>

      )}
      {!property ? (
        <></>
      ) : (

        <button className="cancel-btn float-start btn-outline-danger"
          onClick={() => deleteProperty(listingId)}
        >
          Delete
        </button>

      )}
      {!reservation ? (
        <></>
      ) : (
        
        <button className="accept-btn float-start"
          onClick={ () =>patchAccept(bookingId)}
        >
          Accept
        </button>
      )}
      {!booking && !reservation ? (
        <></>
      ) : (
        <>
        <br/>
          <h1 className="pt-2" style={{textAlign:"center", float:"left",  width:"100%"}}>Status : {status}</h1>
        </>
      )}
      
    </div>
  );
};

export default ListingCard;
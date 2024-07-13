import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ArrowBackIosNew, ArrowForwardIos, Favorite } from '@mui/icons-material';
import '@glidejs/glide/dist/css/glide.core.min.css';
import "../styles/ListingCard.scss";
import { Link, useNavigate, } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../store/auth";

const Data = ({
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
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/properties");
        setMyData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const initializeGlide = async () => {
      try {
        const Glide = require('@glidejs/glide').default;
        const slider = new Glide(".glide", {
          type: "slider",
          focusAt: "center",
          perView: 1,
          autoplay: 3000,
          animationDuration: 700,
          gap: 0,
          classes: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
        });

        slider.mount();

        slider.on('run', () => {
          setCurrentIndex(slider.index);
        });

        return () => {
          slider.destroy();
        };
      } catch (error) {
        console.error("Error initializing Glide:", error);
      }
    };

    if (!loading && myData.length > 0) {
      initializeGlide();
    }
  }, [loading, myData]);


  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?.userId === listingId);


  return (
    <div className='max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16'>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {myData.map((post, index) => {
          const { listingId, amenities, title, price, id, listingPhotoPaths, description } = post;
          return (
            
            // <Link to={`/buy/${listingId}`}>
              <div className="rounded overflow-hidden shadow-lg" 
              onClick={() => {navigate(`/buy/${listingId}`);}} 
               key={index}>
                <div className="relative w-full glide">
                  <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                      {listingPhotoPaths.map((photo, index) => (
                        <li key={index} className={`glide__slide${index === currentIndex ? 'active' : ''}`}>
                          <img
                            src={`http://localhost:3001/${photo.replace("public", "")}`}
                            alt={`photo ${index + 1}`}
                            className="w-full max-w-full max-h-full m-auto"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div className="glide__arrows flex-1 justify-between w-full" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                      <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                    </button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                      <ArrowForwardIos sx={{ fontSize: "15px" }} />
                    </button>
                  </div> */}
                </div>
                <div className="px-6 py-4">
                  <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                    {title}
                  </a>
                  <p className="text-gray-800 text-sm">
                    Facilities: {amenities.slice(0, 40)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {description.slice(0, 100)}
                  </p>
                  <h3 className="font-bold text-lg inline-block">RS. {price} per night</h3>
                </div>
                <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          // patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
              </div>
            
              // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Data;

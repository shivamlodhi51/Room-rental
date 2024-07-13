import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Loader from "./Loader";

const Buy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { listingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/properties/${listingId}`);
        setMyData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }
  return (
    <>
      <Navbar />

      <div className='max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16'>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {myData.map((post, index) => {
            const { listingId, amenities, title, price, id, listingPhotoPaths, description } = post;
            return (
              <div className="rounded overflow-hidden shadow-lg" key={index}>
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
                  <div className="glide__arrows flex-1 justify-between w-full" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                      <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                    </button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                      <ArrowForwardIos sx={{ fontSize: "15px" }} />
                    </button>
                  </div>
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
              </div>

            );
          })}
        </div>
      </div>
      

    </>
  )
}

export default Buy
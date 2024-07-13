import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, } from "react-router-dom";
import {toast} from "react-toastify";

const AllBooking = () => {
  const [Booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/all`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the response is an array of properties
      setBooking(data); // Update state with the array of properties
      setLoading(false);
    } catch (err) {
      console.error("Fetch Trip List failed:", err.message);
      setError("Failed to fetch trip list. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  const deleteP = (bookingId) => {
    axios.delete(`http://localhost:3001/bookings/delete/${bookingId}`, {
      // status: "Accept"
    })
      .then((res) => {
        console.log("Booking deleted successfully:", res.data);
        toast.success("Deleted successfull");
        // navigate('/admin');
        getTripList();
        // You may perform any additional actions here upon successful update
      })
      .catch((err) => {
        console.error("Error Deleting:", err);
        // You may display a user-friendly error message here
        // For example: alert("Failed to update booking status. Please try again later.");
      });
  }


  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">BookingId</th>
          <th scope="col">Customer Name</th>
          {/* <th scope="col">City</th> */}
          <th scope="col">Price</th>
          <th scope="col">Photo</th>
          <th scope="col">CheckIn</th>
          <th scope="col">CheckOut</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {Booking.map((prop, index) => (
          <tr key={index}>
            <th scope="row">{prop.bookingId}</th>
            <th scope="row">{prop.customerFirstName}</th>
            {/* <td>{prop.city}</td> */}
            <td>{prop.totalPrice}</td>
            <td><img
              src={`http://localhost:3001/${prop.listingPhotoPaths[0]?.replace("public", "")}`}
              alt="profile photo"
              style={{ objectFit: "cover", width: "50px", borderRadius: "100px" }}
            />
            </td>
            <td>{prop.startDate}</td>
            <td>{prop.endDate}</td>
            <td><button onClick={() => deleteP(prop.bookingId)} > <img width={"30px"} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="" />
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AllBooking;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from 'axios';
import {toast} from "react-toastify";

const Alluser = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const allUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/alluser`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data.userData); // Assuming userData is an array within the response data
      setLoading(false);
    } catch (err) {
      console.error("Fetch Trip List failed:", err.message);
      setError("Failed to fetch trip list. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    allUser();
  }, []);

  const deleteU = (userId) => {
    axios.delete(`http://localhost:3001/user/deleteuser/${userId}`, {
      // status: "Accept"
    })
      .then((res) => {
        console.log("User deleted successfully:", res.data);
          toast.success("Deleted successfull");
          // navigate('/admin');
          allUser();
      
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
          <th scope="col">Email</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Profile Image</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={index}>
            <th scope="row">{user.email}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td><img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", width: "50px", borderRadius: "100px" }}
            /></td>
            <td><button onClick={() => deleteU(user.userId)}> <img width={"30px"} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="" />
            </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Alluser
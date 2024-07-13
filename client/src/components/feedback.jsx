import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const Feedback = () => {
  const [feedback, setfeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Allfeedback = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/feedback/Allfeedback`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setfeedback(res.data); // Assuming userData is an array within the response data
      setLoading(false);
    } catch (err) {
      console.error("Fetch Trip List failed:", err.message);
      setError("Failed to fetch trip list. Please try again later.");
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    Allfeedback();
  }, []);

  const deleteFeedback = (_id) => {
    axios.delete(`http://localhost:3001/feedback/delete/${_id}`)
      .then((res) => {
        console.log("Feedback deleted successfully:", res.data);
        toast.success("Deleted successfully");
        setfeedback(); // Refresh feedback list after deletion
      })
      .catch((err) => {
        console.error("Error deleting feedback:", err);
        toast.error("Failed to delete feedback");
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Customer Name</th>
          <th scope="col">Customer Email</th>
          <th scope="col">Feedback</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
  {feedback.map((item, index) => (
    <tr key={index}>
      <td>{item.fullName}</td>
      <td>{item.email}</td>
      <td>{item.message}</td>
      <td>
        <button onClick={() => deleteFeedback(item._id)}>
          <img width={"30px"} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="Delete" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default Feedback;

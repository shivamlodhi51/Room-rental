import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/FeedbackForm.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/feedback/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set proper Content-Type
        },
        body: JSON.stringify(feedback) // Convert feedback object to JSON string
      });

      const responseData = await response.json();
      console.log("Response from server", responseData);

      if (response.ok) {
        toast.success("Feedback sent successfully");
        setFeedback({
          fullName: "",
          email: "",
          message: ""
        });
      } else {
        console.log("Error:", responseData.message);
        toast.error("Failed to send feedback");
      }
    } catch (err) {
      console.log("Sending failed", err.message);
      toast.error("Failed to send feedback");
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <h1 className="text-center mt-5 font-weight-bold">Feedback</h1>
          <hr className="bg-white" />
          <h6 className="text-center">Please write your feedback below:</h6>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-row d-flex flex-col justify-content-center align-items-center">
              <div className="col-md-8">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={feedback.fullName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleInputChange}
                  placeholder="@gmail.com"
                  required
                />
              </div>
            </div>
            <div className="form-row d-flex flex-col justify-content-center align-items-center">
              <div className="col-md-8">
                <label htmlFor="message">Message*</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  value={feedback.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here"
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>
            <div className="form-row d-flex flex-col justify-content-center align-items-center mt-3">
              <button
                type="submit"
                className="btn mt-3 btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

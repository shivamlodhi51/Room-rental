import React, { useState, useEffect } from "react";
import "../styles/Admin.css";
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import Swal from 'sweetalert2';
import Alluser from '../components/Alluser';
import AllProperty from '../components/AllProperty';
import AllBooking from '../components/AllBooking';
import Feedback from '../components/feedback';
import {toast} from "react-toastify";

function Admin() {
  

  const toggleDashboardList = () => {
    const elements = document.querySelectorAll('.dashboard-list');
    elements.forEach(element => {
      if (element.style.display === 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  };

  const Logout = () => {
    Swal.fire("Logging Out From Dashboard!");
    localStorage.removeItem('StaffToken');
  };

  return (
    <>
      <div className="admin-hub">
        <div className="container-fluids">
          <div className="row m-0">
            {/* Left side content */}
            <div className="col-xl-3 col-md-3 col-sm-12 left-side">
              {/* Admin profile */}
              <div className="admin-profile">
                <h3>Admin Panel</h3>
                <button onClick={toggleDashboardList} className="menu-bar"><CiMenuFries /></button>
                <div className="admin-photo">
                  <Link href="#">
                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />
                  </Link>
                  {/* <div className="admin-name"> */}
                    {/* Render staff names here */}
                  {/* </div> */}
                </div>
              </div>
              {/* Dashboard list */}
              <div className="dashboard-list">
                <div className="d-flex align-items-start ">
                  <div className="nav flex-column nav-pills me-3 left-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-patients-tab" data-bs-toggle="pill" data-bs-target="#v-pills-patients" type="button" role="tab" aria-controls="v-pills-patients" aria-selected="false">
                      Register users
                    </button>
                    <button className="nav-link" id="v-pills-staff-tab" data-bs-toggle="pill" data-bs-target="#v-pills-staff"
                      type="button" role="tab" aria-controls="v-pills-staff" aria-selected="false" >
                      Property List
                    </button>
                    <button className="nav-link" id="v-pills-approve-tab" data-bs-toggle="pill" data-bs-target="#v-pills-approve"
                      type="button" role="tab" aria-controls="v-pills-staff" aria-selected="false" >
                      Booking List
                    </button>
                    <button className="nav-link" id="v-pills-schedule-tab" data-bs-toggle="pill" data-bs-target="#v-pills-schedule"
                      type="button" role="tab" aria-controls="v-pills-staff" aria-selected="false" >
                      Feedbacks
                    </button>
                    {/* Add other navigation buttons here */}
                    <button className="nav-link">
                      <Link className="admin-logout" to="/" >LOGOUT</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side content */}
            <div className="col-xl-9 col-md-9 col-sm-12 right-side">
              <div className="right-header">
                <h1 className="admin-head">Admin Panel</h1>
              </div>
              <div className="right-content">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-patients" role="tabpanel" aria-labelledby="v-pills-doctors-tab">
                    {/* <div action="" className="registration-form"> */}
                      <div className="form-title">
                        <h4 className="form-title">
                          User Details
                        </h4>
                      </div>
                      <Alluser/>
                    {/* </div> */}
                  </div>
                  <div className="tab-pane fade" id="v-pills-staff" role="tabpanel" aria-labelledby="v-pills-staff-tab">
                    <AllProperty />
                  </div>
                  <div className="tab-pane fade" id="v-pills-approve" role="tabpanel" aria-labelledby="v-pills-approve-tab">
                    <AllBooking />
                  </div>
                  <div className="tab-pane fade" id="v-pills-schedule" role="tabpanel" aria-labelledby="v-pills-schedule-tab">
                    <Feedback />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;

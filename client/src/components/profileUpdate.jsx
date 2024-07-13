import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import '../styles/profile.css';

const ProfileUpdate = () => {

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    // const {storetokenInLS} = useAuth();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value,
        });
        console.log(formData);
    };

    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(() => {
        setPasswordMatch(
            formData.password === formData.confirmPassword ||
            formData.confirmPassword === ""
        );
    }, [formData.password, formData.confirmPassword]);


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const register_form = new FormData()

            for (var key in formData) {
                register_form.append(key, formData[key])
            }

            const response = await fetch(`http://localhost:3001/user/update/${user.userId}`, {
                method: "PATCH",
                body: register_form,
            })

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                profileImage: null,
            });

            const res_data = await response.json();
            console.log("res from server", res_data);

            if (response.ok) {
                toast.success("Update successfull");
                navigate("/profile");
            } else {
                alert("not a valid registration")
            }
        } catch (err) {
            console.log("Registration failed", err.message)
        }
    }

    const primary = {
        color: '#fff',
        backgroundColor: '#0d6efa',
        borderColor: '#0d6efd'
    };
    return (
        <>
            <Navbar />
            <form className="form m-0" noValidate onSubmit={handleSubmit}>
                <div className="col m-0 pt-5">
                    <div className="row topppp m-0">
                        <div className="col mb-3">
                            <div className="card">
                                <div className="card-body m-0 p-0">
                                    <div className="e-profile">
                                        {/* <div className="row"> */}
                                        <div className="col-4 col-sm-auto mb-3 mt-3">
                                            <div className="mx-auto text-center" style={{ width: "140px" }}>
                                                {/* <> */}
                                                {user.profileImagePath && (
                                                    <>
                                                        <input
                                                            id="image"
                                                            type="file"
                                                            name="profileImage"
                                                            accept="image/*"
                                                            style={{ display: "none" }}
                                                            onChange={handleSubmit}
                                                            required
                                                        />
                                                        <label htmlFor="image" className='position-relative d-flex justify-center align flex-column align-items-center '>
                                                            {formData.profileImage ? (
                                                                <img
                                                                    src={URL.createObjectURL(formData.profileImage)}
                                                                    alt="profile"
                                                                    style={{ objectFit: "cover", borderRadius: "50%" }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={`http://localhost:3001/${user.profileImagePath.replace(
                                                                        "public",
                                                                        ""
                                                                    )}`}
                                                                    alt="profile photo"
                                                                    style={{ objectFit: "cover", borderRadius: "50%" }}
                                                                />
                                                            )}

                                                            <span className='position-absolute ' style={{ backgroundColor: "#0000005e", color: "white", borderRadius: "50%", paddingTop: "60px", height: "100%", width: "100%", overflow: "hidden", cursor: "pointer" }} >Upload Pic</span>
                                                        </label>
                                                    </>
                                                )}
                                                {/* </> */}

                                            </div>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                    <div className="container">
                        <div className="row flex-lg-nowrap">
                            <div className="col">
                                <div className="row">
                                    <div className="col mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>First Name</label>
                                                                    <input className="form-control" name="firstName"
                                                                        onChange={handleChange}
                                                                        type="text" value={user.firstName} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Last Name</label>
                                                                    <input className="form-control"
                                                                        onChange={handleChange}
                                                                        type="text" name="lastName" value={user.lastName} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input className="form-control" name='email'
                                                                        onChange={handleChange}
                                                                        type="text" value={user.email} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 mb-3">
                                                        <div className="mb-2"><b>Change Password</b></div>
                                                        {/* <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Current Password</label>
                                                                    <input className="form-control" name='currentpassword'
                                                                        onChange={handleChange}
                                                                        type="password" placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>New Password</label>
                                                                    <input className="form-control"
                                                                        onChange={handleChange} name='password'
                                                                        type="password" placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {!passwordMatch && (
                                                            <p style={{ color: "red" }}>Passwords are not matched!</p>
                                                        )}
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                                    <input className="form-control" name="confirmPassword"
                                                                        onChange={handleChange}
                                                                        type="password" placeholder="" /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col d-flex justify-content-end">
                                                        <button style={primary} className="btn btn-primary" type="submit"> Save Changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </form>

        </>
    );
};

export default ProfileUpdate;

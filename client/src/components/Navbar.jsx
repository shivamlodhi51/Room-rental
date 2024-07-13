import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import logo from './dDesigner.png';




const Navbar = () => {

    const { user } = useAuth();
    // console.log(user.userId);

    const [dropdownMenu, setDropdownMenu] = useState(false);

    const { isLoggedIn } = useAuth();
    console.log("loggin", isLoggedIn);

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo}  alt="logo" />
                {/* <h3>ROOM RENT</h3> */}
            </Link>

            <div className="navbar_search">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton disabled={search === ""}>
                    <Search
                        sx={{ color: variables.pinkred }}
                        onClick={() => { navigate(`/properties/search/${search}`) }}
                    />
                </IconButton>
            </div>

            <div className="navbar_right">
                {/* <Link to="/createlisting" className="host">
                    Become A Host
                </Link> */}
                <button
                    className="navbar_right_account"
                    onClick={() => setDropdownMenu(!dropdownMenu)}

                ><Menu sx={{ color: variables.darkgrey }} />
                    {isLoggedIn && user? (

                        <>
                            <img
                                src={`http://localhost:3001/${user.profileImagePath.replace(
                                    "public",
                                    ""
                                )}`}
                                alt="profile photo"
                                style={{ objectFit: "cover", borderRadius: "50%" }}
                            />
                        </>
                    ) : (
                        <>
                            <Person sx={{ color: variables.darkgrey }} />
                        </>
                    )}
                </button>
                {dropdownMenu && (
                    <div className="navbar_right_accountmenu">
                        {isLoggedIn ? (
                            <>
                                {/* <Link to={`/profile`}>Profile</Link> */}
                                <Link to={`/${user.userId}/trips`}>Trip List</Link>
                                {/* <Link to={`/${user.userId}/wishList`}>Wish List</Link> */}
                                <Link to={`/${user.userId}/properties`}>Property List</Link>
                                <Link to={`/${user.userId}/reservations`}>Reservation List</Link>
                                <Link to="/createlisting">Become A Host</Link>
                                <Link to="/logout">logout</Link>
                            </>

                        ) : (
                            <>
                                <Link to="/login">Log In</Link>
                                <Link to="/register">Sign Up</Link>
                            </>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Navbar;
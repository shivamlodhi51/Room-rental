import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'; // Correct import without curly braces
import Register from './pages/Register'; // No need for curly braces if exported as default
import Login from './pages/Login'; // No need for curly braces if exported as default
import { Logout } from './pages/Logout'; // No need for curly braces if exported as default
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import CategoryPage from './pages/CategoryPage';
import Search from './pages/Search';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import Admin from './pages/Admin';
import Profile from './components/profileUpdate.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/createlisting" element={<CreateListing />} />
        <Route path="/properties/:listingId" element={<ListingDetails />} />
        <Route path="/properties/category/:category" element={<CategoryPage />} />
        <Route path="/properties/search/:search" element={<Search />} />
        <Route path="/:userId/trips" element={<TripList />} />
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<PropertyList />} />
        <Route path="/:userId/reservations" element={<ReservationList />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
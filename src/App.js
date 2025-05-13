// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Movies from './Movies';
import Cart from './Cart';
import StreamList from './StreamList';
import About from './About';
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// App Component
function App() {
  // Global States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [streamList, setStreamList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load stored data on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
      setIsAuthenticated(true);
      loadUserData(storedUser.username);
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cart));
      localStorage.setItem(`streamList_${currentUser.username}`, JSON.stringify(streamList));
    }
  }, [cart, streamList, currentUser]);

 // Load Cart and StreamList per user
 const loadUserData = (username) => {
  const userCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
  const userStreamList = JSON.parse(localStorage.getItem(`streamList_${username}`)) || [];
  setCart(userCart);
  setStreamList(userStreamList);
};

  // Handle Login
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    loadUserData(user.username);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCart([]);
    setStreamList([]);
  };

  // Add movie to Cart
  const addToCart = (movie) => {
    if (!cart.find(item => item.id === movie.id)) {
      setCart([...cart, movie]);
      toast.success('Added to Cart!');
    } else {
      toast.info('Already in Cart!');
    }
  };

  // Move movie to StreamList
  const moveToStreamList = (movie) => {
    setCart(cart.filter(item => item.id !== movie.id));
    setStreamList([...streamList, { ...movie, watched: false }]);
    toast.success('Moved to StreamList!');
  };

  // Toggle Watched Status
  const toggleWatched = (id) => {
    const updatedList = streamList.map(movie =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    );
    setStreamList(updatedList);
  };

  const deleteFromStreamList = (id) => {
    const updatedList = streamList.filter((movie) => movie.id !== id);
    setStreamList(updatedList);
    toast.info('Movie removed from Stream List.');
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Movies addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} moveToStreamList={moveToStreamList} />} />
              <Route path="/streamlist" element={<StreamList streamList={streamList} toggleWatched={toggleWatched} deleteFromStreamList={deleteFromStreamList} />}/>


            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
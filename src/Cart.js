// src/Cart.js
import React from 'react';
import './App.css';

function Cart({ cart, moveToStreamList }) {
  return (
    <div className="App-header">
      <h1>My Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some movies!</p>
      ) : (
        <ul>
          {cart.map((movie) => (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <button className="add-cart-btn" onClick={() => moveToStreamList(movie)}>
                  Move to StreamList
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
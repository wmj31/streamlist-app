import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to StreamList</h1>
      <Link to="/login">
        <button>Login with Google</button>
      </Link>
    </div>
  );
};

export default Home;
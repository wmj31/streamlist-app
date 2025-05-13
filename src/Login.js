import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './App.css';
import EZMovLogo from './EZMov.png';
import { toast } from 'react-toastify';

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignUp) {
      const userExists = users.find((user) => user.username === formData.username);

      if (userExists) {
        toast.error('Username already exists!');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      const newUser = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        email: formData.email,
      };

      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      toast.success('Account created successfully! Please log in.');
      setIsSignUp(false);
      setFormData({ name: '', username: '', password: '', confirmPassword: '', email: '' });
    } else {
      const user = users.find(
        (user) => user.username === formData.username && user.password === formData.password
      );

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        handleLogin(user);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid username or password.');
      }
    }
  };

      const handleGoogleLogin = (response) => {
        try {
          const userData = jwt_decode(response.credential);
          const user = {
            name: userData.name,
            email: userData.email,
            imageUrl: userData.picture,
          };
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          handleLogin(user);
          toast.success('Google Login successful!');
          navigate('/');
        } catch (error) {
          console.error("Google Login Failed:", error);
          toast.error('Google Login Failed.');
        }
      };

  return (
    <div className="App-header">
      <img src={EZMovLogo} alt="EZTechMovie Logo" className="login-logo" />
      <h1>{isSignUp ? 'Create Your Account' : 'Sign In'}</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignUp && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleChange}
            />
          </>
        )}
        <button type="submit" className="login-button">
          {isSignUp ? 'Create Account' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem' }}>
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <span className="link-like" onClick={() => setIsSignUp(false)}>
              Sign In
            </span>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <span className="link-like" onClick={() => setIsSignUp(true)}>
              Create one
            </span>
          </>
        )}
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <GoogleLogin
          clientId="584767806898-m9lp0ndjmf40no6ftp3c3b4a1c037j45.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleGoogleLogin}
          onFailure={(error) => console.log('Google Login Failed:', error)}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
}

export default Login;
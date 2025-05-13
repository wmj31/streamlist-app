// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as serviceWorkerRegistration from './serviceWorker';
import './index.css';

ReactDOM.render(
  <GoogleOAuthProvider clientId="584767806898-m9lp0ndjmf40no6ftp3c3b4a1c037j45.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// Register the service worker properly
serviceWorkerRegistration.register();
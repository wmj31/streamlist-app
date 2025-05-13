import React from 'react';

const About = () => {
  return (
    <div className="App">
      <h1>About StreamList</h1>
      <p>
        StreamList is a React-based application designed to help users manage movie searches, create watchlists, and securely handle user data.
      </p>
      <h2>Password Security</h2>
      <p>
        This app demonstrates secure password handling by implementing hashing techniques. Passwords are never stored in plain text, ensuring user safety through one-way encryption methods like bcrypt.
      </p>
      <h2>Progressive Web App (PWA) Features</h2>
      <p>
        StreamList leverages PWA technology to offer offline capabilities, caching, and background syncing—providing a seamless experience even without a stable internet connection.
      </p>
    </div>
  );
};

export default About;
import React, { useState, useEffect } from 'react';
import '../App.css';

function StreamList() {
  const [input, setInput] = useState('');
  const [streamList, setStreamList] = useState(() => {
    const storedList = localStorage.getItem('streamList');
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streamList));
  }, [streamList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newItem = { title: input, watched: false };
    setStreamList([...streamList, newItem]);
    setInput('');
    console.log("User entered:", input);
  };

  const handleDelete = (index) => {
    const updatedList = streamList.filter((_, i) => i !== index);
    setStreamList(updatedList);
  };

  const toggleWatched = (index) => {
    const updatedList = [...streamList];
    updatedList[index].watched = !updatedList[index].watched;
    setStreamList(updatedList);
  };

  return (
    <div className="streamlist-container">
      <h1>🎬 StreamList</h1>
      <p>Your personal streaming watchlist</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a movie or show..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="streamlist">
        {streamList.map((item, index) => (
          <li key={index} className={item.watched ? 'watched' : ''}>
            <input
              type="checkbox"
              checked={item.watched}
              onChange={() => toggleWatched(index)}
            />
            <span>{item.title}</span>
            <button onClick={() => handleDelete(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
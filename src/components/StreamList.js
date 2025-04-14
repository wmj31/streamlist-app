import React, { useState, useEffect } from 'react';

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
    if (input.trim() === '') return;

    setStreamList([...streamList, { title: input.trim(), watched: false }]);
    setInput('');
  };

  const handleDelete = (indexToRemove) => {
    setStreamList(streamList.filter((_, index) => index !== indexToRemove));
  };

  const toggleWatched = (indexToToggle) => {
    setStreamList(
      streamList.map((item, index) =>
        index === indexToToggle ? { ...item, watched: !item.watched } : item
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
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

        <ul>
          {streamList.map((item, index) => (
            <li key={index} className={item.watched ? 'watched' : ''}>
              <input
                type="checkbox"
                checked={item.watched}
                onChange={() => toggleWatched(index)}
              />
              <span>{item.title}</span>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default StreamList;
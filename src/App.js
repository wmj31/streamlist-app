import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useState, useEffect  } from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './App.css';

function App() {
  
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Keeps track of which item is being edited
  const [editValue, setEditValue] = useState('');   // Stores the edited text
  const [streamList, setStreamList] = useState(() => {
    const storedList = localStorage.getItem('streamList');
    return storedList ? JSON.parse(storedList) : [];
  });

  // 🧠 Save list to localStorage whenever it changes

  useEffect(() => {
    localStorage.setItem('streamList', JSON.stringify(streamList));
  }, [streamList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setStreamList([...streamList, { title: input.trim(), watched: false }]);
    setInput('');
  };

  const handleDelete = (index) => {
    setStreamList(streamList.filter((_, i) => i !== index));
  };
  const handleEdit = (index, currentTitle) => {
    setEditIndex(index);
    setEditValue(currentTitle);
  };
  
  const handleSave = (index) => {
    const updatedList = [...streamList];
    updatedList[index].title = editValue;
    setStreamList(updatedList);
    setEditIndex(null);
  };
  const toggleWatched = (index) => {
    setStreamList(
      streamList.map((item, i) =>
        i === index ? { ...item, watched: !item.watched } : item
      )
    );
    // Start editing an item
const handleEdit = (index, currentTitle) => {
  setEditIndex(index);
  setEditValue(currentTitle);
};

// Save the updated item
const handleSave = (index) => {
  const updatedList = [...streamList];
  updatedList[index].title = editValue;
  setStreamList(updatedList);
  setEditIndex(null);
};


  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App-header">
              <h1>🎬 StreamList</h1>
              <p>Your personal streaming watchlist.</p>
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

                        {editIndex === index ? (
                          <>
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                            <button onClick={() => handleSave(index)}>💾 Save</button>
                          </>
                        ) : (
                          <>
                            <span>{item.title}</span>
                            <button onClick={() => handleEdit(index, item.title)}>✏️ Edit</button>
                            <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                          </>
                        )}
                      </li>
              ))}
              </ul>
            </div>
          }
        />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

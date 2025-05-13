// src/StreamList.js
import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function StreamList({ streamList, toggleWatched, deleteFromStreamList }) {
  return (
    <div className="App-header">
      <h1>My Stream List</h1>
      {streamList.length === 0 ? (
        <p>No movies streamed yet. Add some from your Cart!</p>
      ) : (
        <ul>
          {streamList.map((movie) => (
            <li key={movie.id} className={movie.watched ? 'watched' : ''}>
              <span>
                {movie.title} {movie.watched && '✅'}
              </span>
              <div>
                <button
                  className="edit-btn"
                  onClick={() => toggleWatched(movie.id)}
                >
                  {movie.watched ? 'Unwatch' : 'Mark Watched'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteFromStreamList(movie.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StreamList;
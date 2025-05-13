// src/Movies.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { toast } from 'react-toastify';

// TMDB API Configuration
    const API_KEY = '84900170a0917a427c2a3200be78d152';  
    const BASE_URL = 'https://api.themoviedb.org/3';  
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; 

    function Movies({ addToCart }) {
        const [movies, setMovies] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [loading, setLoading] = useState(false);
      
        // Fetch popular movies on page load
        useEffect(() => {
          fetchMovies();
        }, []);
      
        // Fetch movies (Popular or Search)
        const fetchMovies = async (query) => {
          setLoading(true);
          let url = query
            ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      
          try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results || []);
          } catch (error) {
            toast.error('Failed to fetch movies.');
          }
          setLoading(false);
        };
      
        const handleSearch = (e) => {
          e.preventDefault();
          fetchMovies(searchTerm);
        };
      
        return (
          <div className="App-header">
            <h1>Find Your Movie 🎬</h1>
      
            {/* Search Bar */}
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
      
            {/* Movies List */}
            {loading ? (
            <ul className="movies-grid">
                {[...Array(8)].map((_, index) => (
                <li key={index} className="movie-item skeleton">
                    <div className="movie-poster skeleton-poster"></div>
                    <div className="movie-title skeleton-text"></div>
                </li>
                ))}
            </ul>
            ) : (
            <ul className="movies-grid">
                {movies.map((movie) => (
                <li key={movie.id} className="movie-item fade-in">
                    <img
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={movie.title}
                    className="movie-poster"
                    />
                    <span className="movie-title">{movie.title}</span>
                    <button className="add-cart-btn" onClick={() => addToCart(movie)}>
                    Add to Cart
                    </button>
                </li>
                ))}
            </ul>
            )}
          </div>
        );
      }
      
      export default Movies;
import React, { useEffect, useState } from 'react'
import "./Row.css"
import axios from './axios';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(fetchUrl);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchUrl]);
  
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => 
          ((isLargeRow && movie.poster_path) || 
          (!isLargeRow && movie.backdrop_path)) &&(
         (
            <img
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            key={movie.id}
            src={`${baseUrl}${isLargeRow?movie.poster_path :movie.backdrop_path}`}
            alt="Image not found"
          />
         )
          ))
         }
      </div>
    </div>
  );
}

export default Row;

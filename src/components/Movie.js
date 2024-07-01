import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1); // Pagination handler
  const [watchList, setWatchList] = useState([]);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const savedWatchList = JSON.parse(localStorage.getItem('imdb')) || [];
    setWatchList(savedWatchList);
  }, []);

  const addToWatchList = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem('imdb', JSON.stringify(newWatchList));
  };

  const removeFromWatchList = (movie) => {
    const filteredWatchList = watchList.filter((m) => m.id !== movie.id);
    setWatchList(filteredWatchList);
    localStorage.setItem('imdb', JSON.stringify(filteredWatchList));
  };

  const showButton = (id) => {
    setHover(id);
  };

  const hideButton = () => {
    setHover(null);
  };

  const onNext = () => {
    setPageNum(pageNum + 1);
  };

  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f081782f225dbb28b0848bbc54e5a495&page=${pageNum}`);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [pageNum]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='text-2xl font-bold my-4 text-center text-blue-500'>
        Trending Movies:-
      </div>

      <div className='flex flex-wrap justify-center'>
        {movies.map((movie) => {
          const isInWatchList = watchList.some((m) => m.id === movie.id);
          return (
            <div
              onMouseOver={() => showButton(movie.id)}
              onMouseLeave={() => hideButton()}
              key={movie.id}
              className='relative w-[253px] h-[50vh] bg-center bg-cover rounded-xl m-4 mr-6 ml-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500'
              style={{
                backgroundImage: `URL(https://image.tmdb.org/t/p/original${movie.poster_path})`
              }}>

              {hover === movie.id && (
                <div className='absolute right-2 top-2 bg-green-500 text-white text-2xl p-2 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out'>
                  {!isInWatchList ?
                    (<div onClick={() => addToWatchList(movie)}>✅</div>)
                    :
                    (<div onClick={() => removeFromWatchList(movie)}>❌</div>)
                  }
                </div>
              )}

              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-center'>
                <h3 className='text-lg font-bold'>{movie.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        prevPageProp={onPrev}
        pageNumProp={pageNum}
        nextPageProp={onNext}
      />
    </div>
  );
}

export default Movie;

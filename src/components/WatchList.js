import React, { useState, useEffect } from "react";

function WatchList() {
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  const genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("imdb");
    moviesFromLocalStorage = moviesFromLocalStorage ? JSON.parse(moviesFromLocalStorage) : [];
    setFavourites(moviesFromLocalStorage);
  }, []);

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);
  }, [favourites]);

  let filteredArray = [];

  // Genre Filter
  filteredArray =
    currGenre === "All Genres"
      ? favourites
      : favourites.filter((movie) => genreids[movie.genre_ids[0]] === currGenre);

  // Sorting with Respect to ratings
  if (rating === -1) {
    filteredArray = filteredArray.sort((objA, objB) => objB.vote_average - objA.vote_average);
  }

  if (rating === 1) {
    filteredArray = filteredArray.sort((objA, objB) => objA.vote_average - objB.vote_average);
  }

  // Search filter
  filteredArray = filteredArray.filter((movie) => {
    return movie.title.toLowerCase().includes(searchStr.toLowerCase());
  });

  // Delete movie
  const del = (movie) => {
    let newArray = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  return (
    <div className="container mx-auto mt-6 bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex justify-center flex-wrap bg-white p-4 rounded-lg shadow-md">
        {genres.map((genre) => {
          return (
            <button
              key={genre}
              className={
                currGenre === genre
                  ? "m-2 text-lg p-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md"
                  : "m-2 text-lg p-2 bg-gray-300 hover:bg-blue-500 text-black hover:text-white rounded-lg font-semibold shadow-md transition duration-300"
              }
              onClick={() => setCurrGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="text-center mt-4 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          className="border border-gray-400 bg-gray-200 text-black text-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for Movies"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg mt-6 bg-white">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    className="mr-1 cursor-pointer"
                    onClick={() => setRating(1)}
                    alt="Sort Up"
                  />
                  <div>Ratings</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    className="ml-1 cursor-pointer"
                    onClick={() => setRating(-1)}
                    alt="Sort Down"
                  />
                </div>
              </th>
              <th className="px-6 py-4">Popularity</th>
              <th className="px-6 py-4">Genre</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredArray.map((movie) => {
              return (
                <tr key={movie.id} className="hover:bg-gray-100">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-24 w-40 object-cover rounded-lg shadow-md"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 text-lg">{movie.title}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{movie.vote_average}</td>

                  <td className="px-6 py-4">{movie.popularity}</td>

                  <td className="px-6 py-4">{genreids[movie.genre_ids[0]]}</td>

                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => del(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;

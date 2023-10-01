import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
  const [popular, setPopular] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState({});
  const [favourites, setFavourites] = useState(
    Array(popular.length).fill(false)
  );
  const [error, setError] = useState(null);

  const toggle = (movieId) => {
    // Copy the current state of favorites
    const newFavourites = { ...favourites };

    // Toggle the favorite status for the specified movie
    newFavourites[movieId] = !newFavourites[movieId];

    // Update the favorites state
    setFavourites(newFavourites);

    // Save the updated favorites to local storage
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  // function to convert the number to two numbers before decimal
  const convertToTwoDecimalPlaces = (number) =>
    (Math.round(number * 100) / 10).toFixed(1);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_TOKEN;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      )
      .then((res) => {
        console.log(res);
        setPopular(res.data.results);
      })
      .catch((err) => {
        console.log("Error fetching movie data:", err);
        setError("Failed to fetch movie details. Please try again later.");
      });

    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setUpcoming(res.data.results);
    //   })
    //   .catch((err) => {
    //     console.log("Error fetching movie data:", err);
    //     setError("Failed to fetch movie details. Please try again later");
    //   });

    // Fetch genre data from TMDb API
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((genreRes) => {
        const genreData = genreRes.data.genres;

        // Create a map of genre IDs to genre names
        const genreMap = {};
        genreData.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });

        // Set the genre map in state
        // console.log(genreRes)
        setGenres(genreMap);
      })
      .catch((err) => {
        console.log("Error fetching genre data:", err);
      });

    // Load saved favorites from local storage
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    } else {
      setFavourites(Array(popular.length).fill(false));
    }
  }, [popular.length]);

  return {
    popular,
    // upcoming,
    genres,
    favourites,
    error,
    setError,
    toggle,
    convertToTwoDecimalPlaces,
  };
};
export default useFetch;

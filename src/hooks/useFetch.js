import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {

  const [data, setData] = useState({
        popular: [],
        upcoming: [],
        genres: {},
        favourites: [],
        error: null
    });



   const toggle = (movieId) => {
        setData(prevData => {
            const newFavourites = [...prevData.favourites];
            newFavourites[movieId] = !newFavourites[movieId];
            localStorage.setItem("favourites", JSON.stringify(newFavourites));
            return { ...prevData, favourites: newFavourites };
        });
    };

  // function to convert the number to two numbers before decimal
  const convertToTwoDecimalPlaces = (number) =>
    (Math.round(number * 100) / 10).toFixed(1);



   useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;

        const fetchData = async () => {
            try {
                const [popularRes, upcomingRes, genreRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
                    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`),
                    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
                ]);
                setData({
                    ...data,
                    popular: popularRes.data.results,
                    upcoming: upcomingRes.data.results
                });
                const genreData = genreRes.data.genres;
                const genreMap = {};
                genreData.forEach((genre) => {
                    genreMap[genre.id] = genre.name;
                });
                setData(prevData => ({ ...prevData, genres: genreMap }));
            } catch (err) {
                console.error("Error fetching data:", err);
                setData(prevData => ({ ...prevData, error: "Failed to fetch movie details. Please try again later." }));
            }
        };

        fetchData();

        const savedFavourites = localStorage.getItem("favourites");
        if (savedFavourites) {
            setData(prevData => ({ ...prevData, favourites: JSON.parse(savedFavourites) }));
        } else {
            setData(prevData => ({ ...prevData, favourites: Array(prevData.popular.length).fill(false) }));
        }
    }, [data]);

  return {
   ...data,
    toggle,
    convertToTwoDecimalPlaces,
  };
};
export default useFetch;

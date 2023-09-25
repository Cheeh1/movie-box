import { React, useState, useEffect } from "react"
import axios from "axios";

const useFetch = () => {
    const [popular, setPopular] = useState([]);
    const [rated, setRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [genres, setGenres] = useState({});
    const [favourites, setFavourites] = useState(Array(popular.length).fill(false));
    const [error, setError] = useState(null);


    const toggle = (index) => {
        const newFavourites = [...favourites];
        newFavourites[index] = !newFavourites[index];
        setFavourites(newFavourites);

        // Save the updated favorites to local storage
        localStorage.setItem('favourites', JSON.stringify(newFavourites))
    };

      // function to convert the number to two numbers before decimal
      const convertToTwoDecimalPlaces = (number) => (Math.round(number * 100) / 10).toFixed(1); 


    useEffect(() => {
        // Fetch the list of top-rated movies
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;

        // axios.get(`${apiUrl}/3/movie/top_rated?api_key=${apiKey}`)
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3b1fcd41484bafe02d0ed67ba239e809`)
            .then(res => {
                console.log(res)
                setPopular(res.data.results); // Slice the array to include only the first 10 items
            })
            .catch(err => {
                console.log("Error fetching movie data:", err);
                setError('Failed to fetch movie details. Please try again later.')
            });


        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=3b1fcd41484bafe02d0ed67ba239e809`)
            .then(res => {
                console.log(res)
                setRated(res.data.results);
            })
            .catch(err => {
                console.log("Error fetching movie data:", err)
                setError("Failed to fetch movie details. Please try again later")
            });

        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=3b1fcd41484bafe02d0ed67ba239e809`)
            .then(res => {
                console.log(res)
                setUpcoming(res.data.results);
            })
            .catch(err => {
                console.log("Error fetching movie data:", err)
                setError("Failed to fetch movie details. Please try again later")
            });


        // Extract unique genre IDs from the movie data
        // const genreIds = Array.from(new Set(res.data.results.flatMap(movie => movie.genre_ids)));

        // Fetch genre data from TMDb API
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
            .then(genreRes => {
                const genreData = genreRes.data.genres;

                // Create a map of genre IDs to genre names
                const genreMap = {};
                genreData.forEach(genre => {
                    genreMap[genre.id] = genre.name;
                });

                // Set the genre map in state
                // console.log(genreRes)
                setGenres(genreMap);
            })
            .catch(err => {
                console.log("Error fetching genre data:", err);
            });

             // Load saved favorites from local storage
            const savedFavourites = localStorage.getItem('favourites')
            if (savedFavourites) {
                setFavourites(JSON.parse(savedFavourites))
            } else {
                setFavourites(Array(popular.length).fill(false))
            }

    }, [popular.length]);

    return {
        popular,
        rated,
        upcoming,
        genres,
        favourites,
        error,
        toggle,
        convertToTwoDecimalPlaces
    }
}
export default useFetch
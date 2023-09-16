import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/Header'
import Footer from '../components/Footer'
import right from '../assets/icons/Chevron-right.svg'
import imdb from '../assets/icons/imdb.png'
import berry from '../assets/icons/berry.png'
import heart from '../assets/icons/Heart.svg'
import redHeart from '../assets/icons/heart-fill.svg'
import { Link } from "react-router-dom";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [favourites, setFavourites] = useState(Array(movies.length).fill(false));
    const [error, setError] = useState(null);

    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

    const convertToTwoDecimalPlaces = (number) => (Math.round(number * 100) / 10).toFixed(1); // function to convert the number to two numbers before decimal

    useEffect(() => {
        // Fetch the list of top-rated movies
        const apiUrl = import.meta.env.VITE_TMDB_URL;
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;

        // axios.get(`${apiUrl}/3/movie/top_rated?api_key=${apiKey}`)
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=3b1fcd41484bafe02d0ed67ba239e809`)
            .then(res => {
                console.log(res)
                setMovies(res.data.results.slice(0, 10)); // Slice the array to include only the first 10 items

                // Extract unique genre IDs from the movie data
                const genreIds = Array.from(new Set(res.data.results.flatMap(movie => movie.genre_ids)));

                // Fetch genre data from TMDb API
                axios.get(`${apiUrl}/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
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
            })
            .catch(err => {
                console.log("Error fetching movie data:", err);
                setError('Failed to fetch movie details. Please try again later.')
            });
    }, []);

    const toggle = (index) => {
        const newFavourites = [...favourites];
        newFavourites[index] = !newFavourites[index];
        setFavourites(newFavourites);

        // Save the updated favorites to local storage
        localStorage.setItem('favourites', JSON.stringify(newFavourites))
      };      

      useEffect(() => {
        const savedFavourites = localStorage.getItem('favourites')
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites))
        } else {
            setFavourites(Array(movies.length).fill(false))
        }
      },[movies.length])

    return (
        <>
            <Header />
            <main className="mt-20 mb-14 font-DmSans">
                <section className="flex justify-between px-14">
                    <p className="text-gray-900 font-bold text-2xl">Featured Movie</p>
                    <div className="flex gap-1 items-center">
                        <button className="text-rose-700 text-sm">See More</button>
                        <img className="w-[15px] mt-[5px]" src={right} alt="right-logo" />
                    </div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-14">
                    {movies.map((movie, index) => (
                        <section data-testid="movie-card" className="relative flex flex-col gap-2 border border-gray-300 rounded-lg p-4" key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <img data-testid="movie-poster" src={`${baseImageUrl}${movie.poster_path}`} alt="img-poster" />
                            </Link>
                            <div onClick={() => toggle(index)} className="absolute right-7 top-7 border cursor-pointer rounded-2xl p-1 bg-[#f3f4f680]">
                                {!favourites[index] ? (<img src={heart} alt="heart-logo" />) : (<i className="fa-solid fa-heart p-1 text-[#e13509]"></i>)}
                            </div>
                            <div className="flex text-gray-400 text-[12px] font-bold">
                                <p>USA,</p>
                                <p data-testid="movie-release-date" >{movie.release_date.slice(0, 4)}</p>
                            </div>
                            <Link to={`/movies/${movie.id}`}>
                                <p data-testid="movie-title" className="text-gray-900 text-[18px] font-bold">{movie.title}</p>
                            </Link>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex gap-2 text-[12px]">
                                    <img src={imdb} alt="imdb-logo" />
                                    <p>{`${convertToTwoDecimalPlaces(movie.vote_average)}/100`}</p>
                                </div>
                                <div className="flex gap-2 text-[12px]">
                                    <img src={berry} alt="berry-logo" />
                                    <p>{movie.vote_count}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-bold text-[12px]">{movie.genre_ids.map(genreId => genres[genreId]).join(", ")}</p>
                        </section>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MovieList;

import { imdb, berry, heart, tv, menu, play, icon } from '../assets/index'
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from '../components/MovieList'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'

const Homepage = () => {

    const {
        convertToTwoDecimalPlaces,
        genres,
        error,
        setError,
        favourites,
        toggle
    } = useFetch();

    const [headerData, setHeaderData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Replace 'YOUR_API_KEY' with your actual TMDb API key
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;

        // Fetch data specifically for the Header component
        const fetchHeaderData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
                const data = response.data;
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                //select a random movie from the list
                const randomMovieIndex = Math.floor(Math.random() * data.results.length);
                setHeaderData(data.results[randomMovieIndex]);
            } catch (error) {
                console.error('Error fetching header data:', error);
                setError("Failed to fetch movie details. Please try again later")
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchHeaderData();
    }, [setError]);

    if (!headerData) {
        return null; // Render nothing while data is loading
    }

    // Function to handle search when Enter key is pressed
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                const apiKey = import.meta.env.VITE_TMDB_TOKEN;
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
                const data = response.data;
                setSearchResults(data.results);
            } catch (error) {
                console.error('Error searching for movies:', error);
                setError("Failed to fetch searched movies. Please try again later");
            }
        }
    };


    const backgroundImg = {
        backgroundImage: `url('https://image.tmdb.org/t/p/original${headerData.backdrop_path}')`,
    };
    return (
        <>
            {loading ?
                (<div className="mx-[150px] my-[300px] lg:mx-[580px] lg:my-60">
                    <Triangle
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>) : error ? (
                    // Display error message if an error occurred
                    <div className="text-red-500 text-lg font-bold mt-10 text-center">{error}</div>
                ) : (
                    <>
                        <main className="font-DmSans bg-cover bg-center" style={backgroundImg}>
                            <nav className="flex justify-between px-5 lg:px-10 items-center py-5">
                                <div className="flex items-center gap-1 lg:gap-5">
                                    <img className="w-[40px]" src={tv} alt="tv-logo" />
                                    <p className="text-gray-100 text-xl font-extrabold">MovieBox</p>
                                </div>

                                <div className="flex relative">
                                    <input
                                        className=" lg:block shadow-2xl text-gray-200 font-bold placeholder:font-[500] bg-transparent border-2 border-[text-gray-100] w-40 lg:w-96 py-1 px-3 rounded-md placeholder:text-gray-100 placeholder:text-[10px] lg:placeholder:text-[12px]"
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="What do you want to watch?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleKeyPress} />
                                    <img className="absolute right-3 top-3 w-3" src={icon} alt="logo" />
                                </div>

                                <div className="items-center gap-5 hidden lg:flex">
                                    <p className="text-gray-100 text-md font-medium">Sign in</p>
                                    <img className="w-[30px]" src={menu} alt="menu-logo" />
                                </div>
                            </nav>

                            <section className="py-40 px-10 flex flex-col justify-center gap-5">
                                <p className="text-gray-100 drop-shadow-2xl text-3xl font-extrabold tracking-wider font-DmSans">{headerData.title}</p>

                                <div className="flex items-center gap-5">
                                    <div className="flex gap-2 text-gray-100 text-[12px]">
                                        <img src={imdb} alt="imdb-logo" />
                                        <p>{convertToTwoDecimalPlaces(headerData.vote_average)}/100</p>
                                    </div>
                                    <div className="flex gap-2 text-gray-100 text-[12px]">
                                        <img src={berry} alt="berry-logo" />
                                        <p>{headerData.vote_count}</p>
                                    </div>
                                </div>

                                <p className="text-gray-100 w-80 font-extrabold text-sm">{headerData.overview}</p>

                                <div className="flex items-center justify-center rounded-md gap-2 py-2 w-[150px] bg-red-700">
                                    <img src={play} alt="play-logo" />
                                    <button className="text-gray-100 text-sm ">WATCH TRAILER</button>
                                </div>
                            </section>
                        </main>
                        <section className="py-10 px-10">
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {searchResults.map((movie, index) => (
                                        <div className="relative flex flex-col gap-2 border border-gray-300 rounded-lg p-4" key={movie.id}>
                                            <Link to={`/movies/${movie.id}`}>
                                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="img-poster" />
                                            </Link>
                                            <div onClick={() => toggle(index)} className="absolute right-7 top-7 border cursor-pointer rounded-2xl p-1 bg-[#f3f4f680]">
                                                {!favourites[index] ? (<img src={heart} alt="heart-logo" />) : (<i className="fa-solid fa-heart p-1 text-[#e13509]"></i>)}
                                            </div>
                                            <div className="flex text-gray-400 text-[12px] font-bold">
                                                <p>USA,</p>
                                                <p>{movie.release_date.slice(0, 4)}</p>
                                            </div>
                                            <Link to={`/movies/${movie.id}`}>
                                                <p className="text-gray-900 text-[18px] font-bold">{movie.title}</p>
                                            </Link>
                                            <div className="flex items-center justify-between gap-5">
                                                <div className="flex gap-2 text-[12px]">
                                                    <img src={imdb} alt="imdb-logo" />
                                                    <p className="font-medium text-gray-600">{`${convertToTwoDecimalPlaces(movie.vote_average)}/100`}</p>
                                                </div>
                                                <div className="flex gap-2 text-[12px]">
                                                    <img src={berry} alt="berry-logo" />
                                                    <p className="font-medium text-gray-600">{movie.vote_count}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 font-bold text-[12px]">{movie.genre_ids.map(genreId => genres[genreId]).join(", ")}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // <p className="text-gray-400">No results found.</p>
                                <MovieList />
                            )}
                        </section>
                        <Footer />
                    </>
                )}
        </>
    )
}
export default Homepage
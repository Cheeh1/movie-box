import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Triangle } from 'react-loader-spinner'

const MovieDetails = () => {
    const { id } = useParams()

    const apiKey = import.meta.env.VITE_TMDB_TOKEN;

    const [movies, setMovies] = useState({})
    const [writers, setWriters] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [stars, setStars] = useState([]);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true)
    const [genres, setGenres] = useState([]);

    const backgroundImg = {
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movies.backdrop_path}')`,
    };

    // Convert runtime to hours and minutes
    const runtimeHours = Math.floor(movies.runtime / 60); // Hours
    const runtimeMinutes = movies.runtime % 60; // Minutes

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(res => {
                setMovies(res.data)
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch(err => {
                console.log(err)
                setError('Failed to fetch movie details. Please try again later.')
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })

        // Fetch movie credits to get writers, directors, and stars
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
            .then(creditsRes => {
                const cast = creditsRes.data.cast;
                const crew = creditsRes.data.crew;

                // Filter crew members to find writers and directors
                const movieWriters = crew.filter(member => member.job === 'Writer');
                const movieDirectors = crew.filter(member => member.job === 'Director');

                // Set the state for writers and directors
                setWriters(movieWriters.map(writer => writer.name));
                setDirectors(movieDirectors.map(director => director.name));

                // Limit the number of stars to 3
                const limitedStars = cast.slice(0, 3).map(actor => actor.name);
                setStars(limitedStars);

            })
            .catch(err => {
                console.log('Error fetching credits:', err);
                setError('Failed to fetch movie credits. Please try again later.')
            });

        // Fetch the official trailer for the movie
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US&official=true`)
            .then(response => {
                const videoData = response.data.results;
                // console.log(videoData)

                // Check if there are official trailers, and select the first one
                const officialTrailer = videoData.find(video => video.name.includes("Official Trailer"));
                if (officialTrailer) {
                    setTrailer(officialTrailer);
                }
            })
            .catch(error => {
                console.error('Error fetching official trailer:', error);
                setError('Failed to fetch official trailer. Please try again later.')
            });

        // Fetch the genre data for the movie
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(res => {
                setGenres(res.data.genres);
            })
            .catch(err => {
                console.log(err);
            });

    }, [apiKey, id])




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
                    <main className="flex flex-col lg:flex-row gap-20 items-center px-10 py-9  bg-cover bg-center" style={backgroundImg} >
                        <section className="flex flex-col gap-20">
                            <Link to="/" className="flex items-center gap-2 text-gray-100 text-xl cursor-pointer font-bold">
                                <i className="fa-solid fa-house"></i>
                                <p>Home</p>
                            </Link>
                            <img className="rounded-2xl shadow-sm shadow-gray-500" src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} />
                        </section>
                        <section className="flex flex-col gap-5 text-gray-100">
                            <div>
                                {trailer && (
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <iframe
                                                // width=""
                                                // height=""
                                                className="border rounded-2xl lg:w-[800px] h-[300px] shadow-sm shadow-gray-500"
                                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                                title={trailer.name}
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h1 className="lg:text-[40px] text-[30px] font-bold text-gray-100 shadow-2xl">{movies.title}</h1>
                                <div className="flex flex-col-reverse lg:flex-row lg:gap-3 items-start">
                                    <div className="flex gap-3">
                                        <p className="border border-[#b1adad] rounded-md p-[1px] font-bold">PG-13</p>
                                        <p className="lg:text-3xl text-xl -mt-2 lg:-mt-4 font-extrabold">.</p>
                                        <p className="font-bold text-lg">{(movies.release_date)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* <p className="lg:text-3xl text-xl -mt-2 lg:-mt-4 font-extrabold">.</p> */}
                                        <div className="flex gap-3">
                                            {genres.map((genre, index) => (
                                                <p key={index} className="text-gray-100 font-bold">{genre.name}</p>
                                            ))}
                                        </div>
                                        <p className="lg:text-3xl text-xl -mt-2 lg:-mt-4 font-extrabold">.</p>
                                        <p className="font-bold text-lg">{runtimeHours}h {runtimeMinutes}min</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-2xl text-shadow">Overview</p>
                                <p className="font-[600]">{movies.overview}</p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
                                <div className="flex flex-col">
                                    <p className="font-extrabold ">{directors.join(", ")}</p>
                                    <p className="font-[600]">Director</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-extrabold">{writers.join(", ")}</p>
                                    <p className="font-[600]">Writers</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-extrabold">{stars.join(", ")}</p>
                                    <p className="font-[600]">Stars</p>
                                </div>
                            </div>
                        </section>
                    </main>)}

        </>
    )
}
export default MovieDetails
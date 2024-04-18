import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";

const MovieDetails = () => {
    const { id } = useParams()

    const apiKey = import.meta.env.VITE_TMDB_TOKEN;


     const [movieData, setMovieData] = useState({
        movies: {},
        writers: [],
        directors: [],
        stars: [],
        genres: [],
        trailer: null,
        error: null,
        loading: true,
    });

    const { movies, writers, directors, stars, genres, trailer, error, loading } = movieData;

    const backgroundImg = {
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movies.backdrop_path}')`,
    };

    // Convert runtime to hours and minutes
    const runtimeHours = Math.floor(movies.runtime / 60);
    const runtimeMinutes = movies.runtime % 60;

useEffect(() => {
        const fetchData = async () => {
            try {
                const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                const creditsRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
                const videosRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US&official=true`);
                const genresRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);

                setMovieData({
                    movies: movieRes.data,
                    writers: creditsRes.data.crew.filter(member => member.job === 'Writer').map(writer => writer.name),
                    directors: creditsRes.data.crew.filter(member => member.job === 'Director').map(director => director.name),
                    stars: creditsRes.data.cast.slice(0, 3).map(actor => actor.name),
                    genres: genresRes.data.genres,
                    trailer: videosRes.data.results.find(video => video.name.includes("Official Trailer")),
                    error: null,
                    loading: false,
                });
            } catch (error) {
                console.error(error);
                setMovieData(prevState => ({ ...prevState, error: 'Failed to fetch movie details. Please try again later.', loading: false }));
            }
        };

        fetchData();
    }, [apiKey, id]);


    return (
        <>
            {loading ?
                <MovieDetailsSkeleton />
                 : error ? (
                    // Display error message if an error occurred
                    <div className="text-red-500 text-lg font-bold mt-10 text-center">{error}</div>
                ) : (
                    <main className="flex flex-col lg:flex-row gap-20 items-center px-10 py-9 bg-cover bg-center h-screen" style={backgroundImg} >
                        <section className="flex flex-col gap-20">
                            <Link to="/" className="flex items-center gap-2 text-gray-100 text-xl cursor-pointer font-bold">
                                <i className="fa-solid fa-house"></i>
                                <p className="text-shadow-custom">Home</p>
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
                                <h1 className="lg:text-[40px] text-[30px] font-bold text-gray-100 text-shadow-custom">{movies.title}</h1>
                                <div className="flex flex-col-reverse lg:flex-row lg:gap-3 items-start text-shadow-custom">
                                    <div className="flex gap-3">
                                        <p className="border border-[#b1adad] rounded-md px-2 font-bold">PG-13</p>
                                        <p className="lg:text-3xl text-xl -mt-2 lg:-mt-4 font-extrabold">.</p>
                                        <p className="font-bold text-lg">{(movies.release_date)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
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
                            <div className="flex flex-col text-shadow-custom">
                                <p className="font-bold text-2xl text-shadow">Overview</p>
                                <p className="font-[600]">{movies.overview}</p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 text-shadow-custom">
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
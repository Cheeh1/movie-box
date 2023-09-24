import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import tv from '../assets/icons/tv.png'
import home from '../assets/icons/Home.png'
import movie from '../assets/icons/movie.png'
import show from '../assets/icons/tv-show.png'
import calendar from '../assets/icons/Calendar.png'
import logout from '../assets/icons/Logout.png'
import star from '../assets/icons/Star.png'
import expand from '../assets/icons/Expand-Arrow.png'
import ticket from '../assets/icons/Two-Tickets.png'
import list from '../assets/icons/List.png'
import gridImg from '../assets/images/grid-img.png'
import playBig from '../assets/icons/play-big.png'
import listWhite from '../assets/icons/List-white.png'


const MovieDetails = () => {
    const { id } = useParams()

    const apiKey = import.meta.env.VITE_TMDB_TOKEN;

    const [movies, setMovies] = useState({})
    const [writers, setWriters] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [stars, setStars] = useState([]);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const convertToTwoDecimalPlaces = (number) => (Math.round(number * 10) / 10).toFixed(1)
    // Convert runtime to hours and minutes
    const runtimeHours = Math.floor(movies.runtime / 60); // Hours
    const runtimeMinutes = movies.runtime % 60; // Minutes

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(res => setMovies(res.data))
            .catch(err => {
                console.log(err)
                setError('Failed to fetch movie details. Please try again later.')
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

                // Limit the number of stars to 5
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

    }, [id])

    return (
        <>
            <main className="flex gap-10">
                <nav className="hidden sm:hidden md:hidden lg:flex flex-col border rounded-r-[50px] gap-20 py-5 px-5">
                    <div className="flex items-center gap-2">
                        <img className="w-[30px]" src={tv} alt="tv-logo" />
                        <p className="text-xl font-bold">MovieBox</p>
                    </div>

                    <div className="flex flex-col gap-12 ml-5">
                        <Link to="/" className="flex items-center gap-2 text-[#666] text-sm hover:text-[#BE123C] cursor-pointer  font-bold">
                            <img src={home} alt="home-logo" />
                            <p>Home</p>
                        </Link>
                        <div className="flex items-center gap-2 text-[#666] text-sm hover:text-[#BE123C] cursor-pointer font-bold">
                            <img src={movie} alt="home-logo" />
                            <p>Movies</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#666] text-sm hover:text-[#BE123C] cursor-pointer font-bold">
                            <img src={show} alt="home-logo" />
                            <p>Tv Series</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#666] text-sm hover:text-[#BE123C] cursor-pointer font-bold">
                            <img src={calendar} alt="home-logo" />
                            <p>Upcoming</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border border-[#be123cb3] bg-[#f8e7eb66] rounded-[20px] ml-3 p-5">
                        <p className="text-[15px] w-28 font-semibold text-[#333333cc]">Play movie quizes and earn free tickets</p>
                        <p className="text-[12px] w-28 text-[#666] font-medium">50k people are playing now</p>
                        <button className="text-[#BE123C] text-[12px] font-medium bg-[#be123c33] rounded-[30px] p-1">Start playing</button>
                    </div>

                    <div className="flex items-center gap-1 pl-5">
                        <img src={logout} alt="logout" />
                        <button className="text-[20px] font-semibold text-[#666]">Log out</button>
                    </div>
                </nav>


                {error ? (
                    // Display error message if an error occurred
                    <div className="text-red-500">{error}</div>
                ) : (
                <section className="flex flex-col gap-5 my-7">
                    {trailer && (
                        <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-bold">Official Trailer</h2>
                            <div>
                                <iframe
                                    // width="950"
                                    // height="350"
                                    className="border rounded-3xl w-[950px] h-[350px]"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
                        <div className="flex gap-2 text-[14px] lg:text-[18px] text-[#404040] font-medium ">
                            <p data-testid="movie-title">{movies.title}</p>
                            <p className="lg:text-2xl text-xl -mt-2 font-extrabold">.</p>
                            <p data-testid="movie-release-date">{(movies.release_date)}</p>
                            <p className="lg:text-2xl text-xl -mt-2 font-extrabold">.</p>
                            <p>PG-13</p>
                            <p className="lg:text-2xl text-xl -mt-2 font-extrabold">.</p>
                            <p>{runtimeHours}h {runtimeMinutes}min</p>
                        </div>
                        <div className="flex items-center gap-40">
                            <p className="text-gray-400 font-bold text-[12px]">

                            </p>
                            <div className="flex items-center gap-2">
                                <img className="w-5" src={star} alt="star-logo" />
                                <p className="flex items-center gap-1 text-[#E8E8E8] text-[18px] font-medium">{`${convertToTwoDecimalPlaces(movies.vote_average)}`}<span className="text-[#666] text-[14px]">| 350k</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="flex flex-col gap-10">
                            <p data-testid="movie-overview" className="w-[500px] text-[16px] text-[#333]">{movies.overview}</p>
                            <div className="flex flex-col gap-5 text-[16px]">
                                <p className="text-[#333] font-medium">Director : <span className="text-[#BE123C]">{directors.join(", ")}</span></p>
                                <p className="text-[#333] font-medium">Writers :  <span className="text-[#BE123C]">{writers.join(", ")}</span></p>
                                <p className="text-[#333] font-medium">Stars: <span className="text-[#BE123C]">{stars.join(", ")}</span></p>
                            </div>
                            <div className="flex gap-5 border rounded-[10px]">
                                <p className="font-medium text-gray-100 bg-[#BE123C] py-2 px-3 rounded-[10px]">Top rated movie #65</p>
                                <div className="flex items-center gap-28">
                                    <p className="text-[#333] font-medium">Awards 9 nominations</p>
                                    <img className="w-5 mt-1" src={expand} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-center items-center gap-2 bg-[#BE123C] rounded-[10px] p-3">
                                    <img src={ticket} alt="ticket-logo" />
                                    <p className="text-gray-100 font-medium">See Showtimes</p>
                                </div>
                                <div className="flex justify-center items-center gap-2 border-[#be123cb3] bg-[#f8e7eb66] p-3 rounded-[10px]">
                                    <img src={list} alt="list-logo" />
                                    <p className="text-[#333] font-medium">More watch options</p>
                                </div>
                            </div>
                            <div className="relative flex gap-2">
                                <img src={gridImg} alt="list-logo" />
                                <div className="absolute left-3 bg-[#12121280] rounded-[10px] py-2 px-10 bottom-0 flex justify-center items-center gap-2">
                                    <img className="w-5" src={listWhite} alt="grid-images" />
                                    <p className="text-[#E8E8E8] text-[12px] font-medium">The Best Movies and Shows in September</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}
            </main>


        </>
    )
}
export default MovieDetails
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import tv from '../assets/icons/tv.png'
import home from '../assets/icons/Home.png'
import movie from '../assets/icons/movie.png'
import show from '../assets/icons/tv-show.png'
import calendar from '../assets/icons/Calendar.png'
import logout from '../assets/icons/Logout.png'

const MovieDetails = () => {
    const { id } = useParams()

    const apiUrl = import.meta.env.VITE_TMDB_URL;
    const apiKey = import.meta.env.VITE_TMDB_TOKEN;

    const [movies, setMovies] = useState({})
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        axios.get(`${apiUrl}/3/movie/${id}?api_key=${apiKey}`)
            .then(res => setMovies(res.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <main className="flex">
                <nav className="flex flex-col border rounded-r-[50px] gap-10 py-5 px-5">
                    <div className="flex items-center gap-2">
                        <img className="w-[30px]" src={tv} alt="tv-logo" />
                        <p className="text-xl font-bold">MovieBox</p>
                    </div>

                    <div className="flex flex-col gap-7 ml-5">
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
                        <img src={logout} alt="logout"/>
                        <button className="text-[20px] font-semibold text-[#666]">Log out</button>
                    </div>
                </nav>

                <section className="mx-10 my-7">
                    <div className="ml-40">
                        <img className="border rounded-xl" src={`${baseImageUrl}${movies.backdrop_path}`} alt={movies.title} />
                    </div>
                    <div>
                        <div>
                            <p></p>
                        </div>
                        <p></p>
                    </div>
                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}
export default MovieDetails
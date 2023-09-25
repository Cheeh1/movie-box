import React from 'react'
import right from '../assets/icons/Chevron-right.svg'
import imdb from '../assets/icons/imdb.png'
import berry from '../assets/icons/berry.png'
import heart from '../assets/icons/Heart.svg'
import home from '../assets/icons/Home.png'
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const PopularMovie = () => {

    const {
        popular,
        genres,
        favourites,
        error,
        toggle,
        convertToTwoDecimalPlaces
    } = useFetch();

    return (
        <>
            <main className='mx-10 my-20'>
                <Link to="/" className="flex items-center gap-2 text-[#666] text-xl hover:text-[#BE123C] cursor-pointer font-bold">
                    <img className='w-10' src={home} alt="home-logo" />
                    <p>Home</p>
                </Link>

                {error ? (
                    // Display error message if an error occurred
                    <div className="text-red-500 text-lg font-bold mt-10 text-center">{error}</div>
                ) : (
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                        {popular.map((movie, index) => (
                            <div className="relative flex flex-col gap-2 border border-gray-300 rounded-lg p-4" key={movie.id}>
                                <Link to={`/movies/${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="img-poster" />
                                </Link>
                                <div onClick={() => toggle(index)} className="absolute right-7 top-7 border cursor-pointer rounded-2xl p-1 bg-[#f3f4f680]">
                                    {!favourites[index] ? (<img src={heart} alt="heart-logo" />) : (<i className="fa-solid fa-heart p-1 text-[#e13509]"></i>)}
                                </div>
                                <div className="flex text-gray-400 text-[12px] font-bold">
                                    <p>USA,</p>
                                    <p >{movie.release_date.slice(0, 4)}</p>
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
                    </section>)}
            </main>
        </>
    )
}
export default PopularMovie
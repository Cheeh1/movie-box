import { imdb, berry, heart } from '../assets/index'
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const RatedMovie = () => {

    const {
        rated,
        genres,
        favourites,
        error,
        toggle,
        convertToTwoDecimalPlaces
    } = useFetch();

    return (
        <>
            <main className='mx-10 my-10'>
                <div className='flex justify-between items-center'>
                    <Link to="/" className="flex items-center gap-2 text-gray-800 text-xl cursor-pointer font-bold">
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </Link>
                    <p className="text-gray-800 font-bold text-xl lg:text-2xl">Rated Movies</p>
                </div>

                {error ? (
                    // Display error message if an error occurred
                    <div className="text-red-500 text-lg font-bold mt-10 text-center">{error}</div>
                ) : (
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                        {rated.map((movie, index) => (
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
                    </section>)}
            </main>
        </>
    )
}
export default RatedMovie
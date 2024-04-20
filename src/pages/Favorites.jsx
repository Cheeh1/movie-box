import { useFavoriteContext } from "../context/FavoriteContext";
import { Link } from "react-router-dom";
import { imdb, berry } from "../assets/index";
import useFetch from "../hooks/useFetch";

const Favorites = () => {
  const { favorites } = useFavoriteContext();
  const { genres, convertToTwoDecimalPlaces } = useFetch();

  return (
    <div className="px-10 py-10">
      <div className="flex justify-between items-end">
        <h1 className="text-gray-900 text-center font-bold text-2xl lg:text-3xl">
          Favorites
        </h1>
        <Link
          to="/"
          className="flex items-center gap-2 text-black text-2xl cursor-pointer font-bold"
        >
          <i className="fa-solid fa-house"></i>
          <p className="font-extrabold">Home</p>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {favorites.map((movie) => (
          <div
            className="relative flex flex-col gap-2 border border-gray-300 rounded-lg p-4"
            key={movie.id}
          >
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="img-poster"
              />
            </Link>

            <div className="flex text-gray-400 text-[12px] font-bold">
              <p>USA,</p>
              <p>{movie.release_date.slice(0, 4)}</p>
            </div>
            <Link to={`/movies/${movie.id}`}>
              <p className="text-gray-900 text-[18px] font-bold">
                {movie.title}
              </p>
            </Link>
            <div className="flex items-center justify-between gap-5">
              <div className="flex gap-2 text-[12px]">
                <img src={imdb} alt="imdb-logo" />
                <p className="font-medium text-gray-600">{`${convertToTwoDecimalPlaces(
                  movie.vote_average
                )}/100`}</p>
              </div>
              <div className="flex gap-2 text-[12px]">
                <img src={berry} alt="berry-logo" />
                <p className="font-medium text-gray-600">{movie.vote_count}</p>
              </div>
            </div>
            <p className="text-gray-400 font-bold text-[12px]">
              {movie.genre_ids.map((genreId) => genres[genreId]).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

import { imdb, berry, heart, tv, play, icon } from "../assets/index";
import useFetch from "../hooks/useFetch";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

const Homepage = () => {
  const { convertToTwoDecimalPlaces, genres, isError } = useFetch();
  const { favorites, toggleFavorite } = useFavoriteContext();

  const [state, setState] = useState({
    headerData: null,
    searchQuery: "",
    searchResults: [],
    loading: true,
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_TOKEN;

    // Fetch data specifically for the Header component
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = response.data;
        setTimeout(() => {
          setState((prevState) => ({ ...prevState, loading: false }));
        }, 1000);
        // Select a random movie from the list
        const randomMovieIndex = Math.floor(
          Math.random() * data.results.length
        );
        setState((prevState) => ({
          ...prevState,
          headerData: data.results[randomMovieIndex],
        }));
      } catch (error) {
        console.error("Error fetching header data:", error);

        setTimeout(() => {
          setState((prevState) => ({ ...prevState, loading: false }));
        }, 1000);
      }
    };

    fetchHeaderData();
  }, []);

  if (!state.headerData) {
    return null; // Render nothing while data is loading
  }

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${state.searchQuery}`
        );
        const data = response.data;
        setState((prevState) => ({
          ...prevState,
          searchResults: data.results,
        }));
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    }
  };

  const backgroundImg = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original${state.headerData.backdrop_path}')`,
  };

  return (
    <>
      {state.loading ? (
        <div className="mx-[150px] my-[300px] lg:mx-[580px] lg:my-60">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : isError ? (
        <div className="text-red-500 text-lg font-bold mt-10 text-center">
          Please check your network and try again!!
        </div>
      ) : (
        <>
          <main
            className="font-DmSans bg-cover bg-center"
            style={backgroundImg}
          >
            <nav className="flex justify-between px-3 lg:px-10 items-center py-5">
              <div className="flex items-center gap-1 lg:gap-5">
                <img className="w-10 lg:w-[40px]" src={tv} alt="tv-logo" />
                <p className="text-gray-100 lg:text-xl font-extrabold text-shadow-custom">
                  MovieBox
                </p>
              </div>

              <div className="flex relative">
                <input
                  className="text-shadow-custom lg:block shadow-black text-gray-200 font-bold placeholder:font-[500] bg-transparent shadow-2xl border-2 border-[text-gray-100] w-40 lg:w-96 py-1 px-3 rounded-md placeholder:text-gray-100 placeholder:text-[10px] lg:placeholder:text-[12px]"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="What do you want to watch?"
                  value={state.searchQuery}
                  onChange={(e) =>
                    setState({ ...state, searchQuery: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                />
                <img
                  className="absolute right-3 top-3 w-3"
                  src={icon}
                  alt="logo"
                />
              </div>

              <Link
                to="/favorites"
                className="items-center gap-5 flex"
              >
                <div className="relative">
                  {favorites.length > 0 && (
                    <p className="border-2 absolute bg-grey-100 text-white text-shadow shadow shadow-white border-gray-100 h-7 text-center font-extrabold text-sm w-7">
                      {favorites.length}
                    </p>
                  )}
                  <img className="w-12 lg:w-14" src={heart} alt="menu-logo" />
                </div>
              </Link>
            </nav>

            <section className="py-40 px-10 flex flex-col justify-center gap-5">
              <p className="text-gray-100 drop-shadow-2xl text-3xl font-extrabold tracking-wider font-DmSans text-shadow-custom">
                {state.headerData.title}
              </p>

              <div className="flex items-center gap-5 text-shadow-custom">
                <div className="flex gap-2 text-gray-100 text-[12px] text-shadow-custom">
                  <img src={imdb} alt="imdb-logo" />
                  <p>
                    {convertToTwoDecimalPlaces(state.headerData.vote_average)}
                    /100
                  </p>
                </div>
                <div className="flex gap-2 text-gray-100 text-[12px]">
                  <img src={berry} alt="berry-logo" />
                  <p>{state.headerData.vote_count}</p>
                </div>
              </div>

              <p className="text-gray-100 w-80 font-extrabold text-sm">
                {state.headerData.overview}
              </p>

              <div className="flex items-center justify-center rounded-md gap-2 py-2 w-[150px] bg-red-700">
                <img src={play} alt="play-logo" />
                <button className="text-gray-100 text-sm ">
                  WATCH TRAILER
                </button>
              </div>
            </section>
          </main>
          <section className="py-10 px-10">
            {state.searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {state.searchResults.map((movie) => (
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
                    <div
                      onClick={() => toggleFavorite(movie)}
                      className="absolute right-7 top-7 border cursor-pointer rounded-2xl p-1 bg-[#f3f4f680]"
                    >
                      {favorites.some(
                        (favMovie) => favMovie.id === movie.id
                      ) ? (
                        <i className="fa-solid fa-heart p-1 text-[#e13509]"></i>
                      ) : (
                        <img src={heart} alt="heart-logo" />
                      )}
                    </div>
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
                        <p className="font-medium text-gray-600">
                          {movie.vote_count}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 font-bold text-[12px]">
                      {movie.genre_ids
                        .map((genreId) => genres[genreId])
                        .join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <MovieList />
            )}
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
export default Homepage;

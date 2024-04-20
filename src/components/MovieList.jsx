import useFetch from "../hooks/useFetch";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";

const MovieList = () => {
  const { isError } = useFetch();

  return (
    <>
      {isError ? (
        // Display error message if an error occurred
        <div className="text-red-500 text-lg font-bold mt-10 text-center">
          Please check your network and try again!!!
        </div>
      ) : (
        <>
          <main className="mt-16 mb-14 font-DmSans lg:mx-14">
            <PopularMovies />

            <UpcomingMovies />
          </main>
        </>
      )}
    </>
  );
};

export default MovieList;

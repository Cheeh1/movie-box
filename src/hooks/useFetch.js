import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = () => {

     
   
        const apiKey = import.meta.env.VITE_TMDB_TOKEN;

        const fetchMovies = async () => {
            
                const [popularRes, upcomingRes, genreRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
                    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`),
                    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
                ]);
               
                const popular = popularRes.data.results;
                const upcoming = upcomingRes.data.results;

                const genreData = genreRes.data.genres;
                const genreMap = {};
                genreData.forEach((genre) => {
                    genreMap[genre.id] = genre.name;
                });

                return { popular, upcoming, genres: genreMap }
            
        };

        const { data, isLoading, isError } = useQuery({queryKey: ['movies'], queryFn: fetchMovies});

        const convertToTwoDecimalPlaces = (number) => (Math.round(number * 100) / 10).toFixed(1);

   

  return {
   ...data,
   isLoading,
   isError,
convertToTwoDecimalPlaces,
  };
};
export default useFetch;

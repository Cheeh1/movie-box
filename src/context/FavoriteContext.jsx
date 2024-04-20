import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for favorite movies
const FavoriteContext = createContext();

// Custom hook to use the favorite context
export const useFavoriteContext = () => useContext(FavoriteContext);

// Provider component to wrap your app and provide the context
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Function to toggle favorite status of a movie
  const toggleFavorite = (movie) => {
    const index = favorites.findIndex((favMovie) => favMovie.id === movie.id);

    if (index === -1) {
      setFavorites([...favorites, movie]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

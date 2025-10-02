import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { Movie } from "../types/Movie";

interface MovieContextType {
  favorites: Movie[];
  addFavorites: (movie: Movie) => void;
  removeFavorites: (movieId: string | number) => void;
  isFavorite: (movieId: string | number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

//Hook
export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const storedData = localStorage.getItem("favorites");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((mov) => mov.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorites = (movieId: string | number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: string | number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addFavorites,
    removeFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

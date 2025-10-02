import { type Movie } from "../types/Movie";
import { type RawMovie } from "../types/RawMovie";
import { DEFAULT_KEYWORDS } from "../constants/movieConst";
import { imdbApi } from "../lib/axios";

const mapRawToMovie = (movie: RawMovie) => ({
  id: movie["#IMDB_ID"],
  title: movie["#TITLE"],
  image: movie["#IMG_POSTER"],
  year: movie["#YEAR"]?.toString(),
  actors: movie["#ACTORS"],
});

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await imdbApi.get(
      `/search?q=${encodeURIComponent(query)}`
    );
    const data = response.data;

    return data.description.map(mapRawToMovie);
  } catch (error) {
    console.log("Failed to search movies:", error);
    throw new Error("Movie search failed.");
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const movies = DEFAULT_KEYWORDS.map(async (movie) => {
    try {
      const results = await searchMovies(movie);
      return results[0] || null;
    } catch (error) {
      console.error(`Failed to fetch movie "${movie}`, error);
      return null;
    }
  });

  const results = await Promise.all(movies);
  return results.filter(Boolean) as Movie[];
};

export const getMovieTrailer = async (
  imdbId: string
): Promise<string | null> => {
  try {
    const response = await imdbApi.get(`/media/${imdbId}`, {
      responseType: "blob",
    });

    const blob = response.data;
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};

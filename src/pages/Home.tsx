import Form from "../components/Form";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../api/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      const getMovies = await getPopularMovies();
      const shuffledMovies = [...getMovies].sort(() => Math.random() - 0.5);
      setMovies(shuffledMovies);
    } catch (error) {
      console.log(error);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => loadMovies(), 1000);
  }, []);

  const sanitize = (inputData: string) => {
    return inputData
      .replace(/[<>"'()]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  const handleSearch = (formData: FormData) => {
    const search = formData.get("search") as string;

    const sanitizedSearch = sanitize(search);

    if (!sanitizedSearch || loading) return;

    setLoading(true);

    const runSearch = async () => {
      try {
        const results = await searchMovies(sanitizedSearch);
        setMovies(results);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    };

    runSearch(); // Call the async function
    setSearchQuery(""); // Optional: clear the input after search
  };

  return (
    <main className="flex-1 px-[5vw] flex flex-col items-center py-8">
      <Form
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {loading ? (
        <p className="text-center text-white text-2xl animate-pulse flex justify-center items-center">
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </p>
      ) : error ? (
        <>
          <p className="text-center text-red text-2xl">{error}</p>
          <button
            onClick={loadMovies}
            className="mt-4 underline cursor-pointer hover:text-blue-500"
          >
            Retry
          </button>
        </>
      ) : (
        <section className="grid place-content-center grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 w-full">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </section>
      )}

      {!error && !loading && movies.length === 0 && (
        <p className="text-center text-white text-xl">No movies found.</p>
      )}
    </main>
  );
};

export default Home;

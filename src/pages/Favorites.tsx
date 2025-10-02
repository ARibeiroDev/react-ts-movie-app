import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useMovieContext();
  return (
    <main className="flex-1 px-[5vw] py-8 flex flex-col">
      {favorites.length > 0 ? (
        <>
          <h2 className="text-2xl text-center mb-8">Favorite Movies</h2>
          <section className="grid place-content-center grid-cols-[repeat(auto-fit,_minmax(250px,_300px))] gap-6 w-full">
            {favorites.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </section>
        </>
      ) : (
        <>
          <h2 className="mb-8 text-center text-4xl text-white text-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
            No favorites yet
          </h2>
          <p className="text-[#999] text-center text-2xl leading-6">
            Start adding movies to favorites{" "}
            <Link
              to="/"
              className="text-blue-500 underline hover:text-blue-300"
            >
              here
            </Link>
          </p>
        </>
      )}
    </main>
  );
};

export default Favorites;

import type { Movie } from "../types/Movie";
import { useMovieContext } from "../context/MovieContext";
import { useState } from "react";
import { getMovieTrailer } from "../api/api";
import Modal from "./Modal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addFavorites, removeFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadTrailer, setLoadTrailer] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (favorite) {
      removeFavorites(movie.id);
    } else {
      addFavorites(movie);
    }
  };

  const openModal = async () => {
    setShowModal(true);
    setLoadTrailer(true);
    const url = await getMovieTrailer(movie.id.toString());
    setTrailerUrl(url);
    setLoadTrailer(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTrailerUrl(null); // release memory
  };

  return (
    <>
      <article
        className="relative rounded-lg overflow-hidden bg-[#1a1a1a] transition-all duration-300 flex flex-col h-full group"
        tabIndex={0}
      >
        <figure className="relative w-full transition-all duration-300 ease-in-out aspect-[2/3]">
          <figcaption className="sr-only">Movie Poster</figcaption>

          <img
            className="w-full h-full object-cover grid place-content-center text-white text-xl text-center"
            src={movie.image}
            alt={`Poster not available for ${movie.title}`}
          />
          <button
            className="absolute pointer-events-auto cursor-pointer top-4 right-4 text-white text-xl bg-gray-950/50 rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200 hover:bg-gray-900 active:bg-[#ff4757]"
            onClick={toggleFavorite}
            aria-pressed={favorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none bg-linear-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.8)] opacity-0 transition-opacity duration-200 flex flex-col justify-end p-4 group-hover:opacity-100 group-focus-within:opacity-100"></div>
        </figure>
        <section
          className="p-4 flex-1 flex flex-col gap-2"
          aria-label="movie details"
        >
          <h3 className="text-lg m-0">{movie.title}</h3>
          <p className="text-[#999] text-base">{movie.year}</p>
          <p className="text-blue-200 text-sm">{movie.actors}</p>
          <button
            className="cursor-pointer text-blue-400 hover:text-blue-200 mt-2 text-sm"
            onClick={openModal}
          >
            See Trailer
          </button>
        </section>
      </article>

      {showModal && (
        <Modal onClose={closeModal}>
          {loadTrailer ? (
            <p className="p-8 text-white text-center  animate-pulse">
              Loading trailer...
            </p>
          ) : trailerUrl ? (
            <video
              src={trailerUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-auto aspect-video"
            />
          ) : (
            <p className="p-8 text-white text-center">
              ❌ Trailer not available.
            </p>
          )}
        </Modal>
      )}
    </>
  );
};

export default MovieCard;

import type { Dispatch, SetStateAction } from "react";

interface FormProps {
  loading: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: (formData: FormData) => void;
}

const Form = ({
  loading,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: FormProps) => {
  return (
    <form action={handleSearch} className="w-full max-w-xl mb-6 flex gap-2">
      <label className="sr-only" htmlFor="search">
        Search Movies
      </label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="e.g. deadpool"
        className="bg-neutral-600 p-3 rounded flex-1 focus:outline-blue-400 focus:outline-1"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-disabled={loading}
        disabled={loading}
        className={`py-3 px-6 rounded ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-700 cursor-pointer hover:bg-blue-900"
        } whitespace-nowrap transition-colors duration-250 focus:outline-blue-400 focus:outline-1`}
      >
        Search
      </button>
    </form>
  );
};

export default Form;

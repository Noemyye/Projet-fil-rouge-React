import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../firebase";
import { getPosterSrc } from "../config/moviePosters";
import Search from "../assets/search.png";

interface Movie {
  id: string;
  title?: string;
  img?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data as Movie[]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredMovies([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm)
    );
    setFilteredMovies(results.slice(0, 6));
    setIsOpen(results.length > 0);
  }, [query, movies]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (movieId: string) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/film/${movieId}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="bg-stone-200 w-full sm:w-50 rounded-sm flex p-1 items-center">
        <img src={Search} className="h-3.5 w-3.5 m-1.5" alt="" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && filteredMovies.length > 0 && setIsOpen(true)}
          className="w-full text-sm bg-transparent outline-none"
        />
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <button
                type="button"
                onClick={() => handleSelect(movie.id)}
                className="w-full px-3 py-2 flex items-center gap-3 hover:bg-stone-100 transition text-left"
              >
                <img
                  src={getPosterSrc(movie.img)}
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <span className="text-sm font-medium text-gray-800 truncate">
                  {movie.title ?? "Sans titre"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

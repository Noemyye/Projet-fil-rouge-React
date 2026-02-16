import { useEffect, useState } from "react";
import { getMoviesBySaga } from "../firebase";
import CardMovie, { type Movie } from "./CardMovie";

interface ListMovieProps {
  saga: "marvel" | "starwars" | "hungergames";
}

export default function ListMovie({ saga }: ListMovieProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMoviesBySaga(saga)
      .then((data) => setMovies(data as Movie[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [saga]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-2 gap-4 w-full sm:flex sm:flex-wrap sm:gap-10 sm:w-250 sm:justify-start">
      {movies.map((movie) => (
        <CardMovie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

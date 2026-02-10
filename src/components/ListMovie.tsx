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
    <div className="flex flex-wrap gap-5 justify-center">
      {movies.map((movie) => (
        <CardMovie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

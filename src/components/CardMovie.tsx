import EndGameImage from "../assets/end-game.jpg";

export interface Movie {
  id: string;
  title?: string;
  director?: string;
  year?: string;
  img?: string;
  [key: string]: unknown;
}

interface CardMovieProps {
  movie: Movie;
}

export default function CardMovie({ movie }: CardMovieProps) {
  const posterSrc = (movie.img as string | undefined) ?? EndGameImage;
  const title = movie.title ?? "Sans titre";
  const director = movie.director ?? "—";
  const date = (movie.year as string | undefined) ?? (movie.date as string | undefined) ?? "—";

  return (
    <div className="w-75 h-100 bg-gray-700 rounded-2xl relative overflow-hidden">
      <img
        src={posterSrc}
        className="w-full h-full rounded-2xl object-cover"
        alt={title}
      />
      <div className="absolute inset-0 p-8 flex flex-col items-start justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
        <div className="flex gap-2 text-white/80 text-sm">
          <p>{date}</p>
          <span>-</span>
          <p>{director}</p>
        </div>
        <div className="text-white font-semibold text-lg">{title}</div>
      </div>
    </div>
  );
}

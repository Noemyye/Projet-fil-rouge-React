import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterSrc } from "../config/moviePosters";
import { auth, addMovieToFavorites, removeMovieFromFavorites, getUserFavorites } from "../firebase";
import Heart from "../assets/heart-border.png";
import HeartFull from "../assets/heart-full.png";

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
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const posterSrc = getPosterSrc(movie.img);
  const title = movie.title ?? "Sans titre";
  const director = movie.director ?? "—";
  const date = (movie.year as string | undefined) ?? (movie.date as string | undefined) ?? "—";

  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const favorites = await getUserFavorites(user.uid);
          setIsFavorite(favorites.includes(movie.id));
        } catch (error) {
          console.error("Error checking favorites:", error);
        }
      }
    };
    checkFavorite();
  }, [movie.id]);

  const handleClick = () => {
    navigate(`/film/${movie.id}`);
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth/login");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeMovieFromFavorites(user.uid, movie.id);
        setIsFavorite(false);
      } else {
        await addMovieToFavorites(user.uid, movie.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-auto aspect-[3/4] bg-gray-700 rounded-2xl relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 sm:w-75 sm:h-100 sm:aspect-auto"
      onClick={handleClick}
    >
      <img
        src={posterSrc}
        className="w-full h-full rounded-2xl object-cover"
        alt={title}
      />
      
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={handleFavorite}
          disabled={isLoading}
          className="backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <img
            src={isFavorite ? HeartFull : Heart}
            alt={isFavorite ? "Favori" : "Non favori"}
            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 transition-all duration-300"
          />
        </button>
      </div>

      <div className="absolute inset-0 p-3 sm:p-5 lg:p-8 flex flex-col items-start justify-end gap-1 sm:gap-2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
        <div className="flex gap-2 text-white/80 text-[10px] sm:text-xs xl:text-sm">
          <p>{date}</p>
          <span>-</span>
          <p>{director}</p>
        </div>
        <div className="text-white font-semibold text-xs sm:text-sm xl:text-lg">{title}</div>
      </div>
    </div>
  );
}

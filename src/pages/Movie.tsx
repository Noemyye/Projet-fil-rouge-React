import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, getCommentsByMovieId, type CommentDoc } from '../firebase';
import { getPosterSrc } from '../config/moviePosters';
import type { Movie } from '../components/CardMovie';
import CreateComment from '../components/CreateComment';
import ListComments from '../components/ListComments';

type CommentItem = CommentDoc & { id: string; createdAt: unknown };

export default function Movie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshComments = useCallback(() => {
    if (!id) return;
    getCommentsByMovieId(id)
      .then((list) => setComments(list as CommentItem[]))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getMovieById(id)
      .then((data) => {
        if (data) {
          setMovie(data as Movie);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    refreshComments();
  }, [id, refreshComments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Film introuvable</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-stone-800"
        >
          Retour
        </button>
      </div>
    );
  }

  const posterSrc = getPosterSrc(movie.img);
  const title = movie.title ?? "Sans titre";
  const director = movie.director ?? "—";
  const date = (movie.year as string | undefined) ?? (movie.date as string | undefined) ?? "—";
  const description = (movie.description as string | undefined) ?? (movie.synopsis as string | undefined) ?? "";
  const genre = movie.genre as string | undefined;
  const rating = movie.rating as string | number | undefined;
  const duration = movie.duration as string | undefined;

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <img
          src={posterSrc}
          alt={title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 ">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:text-gray-300 flex items-center gap-2"
        >
          <span>←</span> Retour
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-80 flex-shrink-0">
            <img
              src={posterSrc}
              alt={title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-lg">
              <div>
                <span className="text-gray-300">Date de sortie:</span> {date}
              </div>
              <div>
                <span className="text-gray-300">Réalisateur:</span> {director}
              </div>
            </div>

            {description && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-200 leading-relaxed">{description}</p>
              </div>
            )}

            {(genre || rating || duration) && (
              <div className="flex flex-wrap gap-4 text-sm">
                {genre && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {genre}
                  </span>
                )}
                {rating && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    ⭐ {rating}
                  </span>
                )}
                {duration && (
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    ⏱ {duration}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <section className="mt-12 pt-8 border-t border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Commentaires</h2>
          <div className="flex flex-col gap-6">
            <CreateComment movieId={id!} onCommentAdded={refreshComments} />
            <ListComments comments={comments} onCommentsChanged={refreshComments} />
          </div>
        </section>
      </div>
    </div>
  );
}

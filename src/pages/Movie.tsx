import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../firebase';
import { getPosterSrc } from '../config/moviePosters';
import type { Movie } from '../components/CardMovie';
import CreateComment from '../components/CreateComment';
import ListComments from '../components/ListComments';

export default function Movie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentAdded = () => {
    setRefreshKey((k) => k + 1);
  };

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

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <img
          src={posterSrc}
          alt={movie.title}
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
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-lg">
              <div>
                <span className="text-gray-300">Date de sortie:</span> {movie.year}
              </div>
              <div>
                <span className="text-gray-300">Réalisateur:</span> {movie.director}
              </div>
            </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-200 leading-relaxed">{movie.desc}</p>
              </div>
          </div>
        </div>

        <section className="mt-12 pt-8 border-t border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Commentaires</h2>
          <div className="flex flex-col gap-6">
            <CreateComment movieId={id!} onCommentAdded={handleCommentAdded} />
            <ListComments key={refreshKey} movieId={id!} />
          </div>
        </section>
      </div>
    </div>
  );
}

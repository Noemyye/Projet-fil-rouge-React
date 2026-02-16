import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, getUserFavorites, getUserProfile, getMovieById } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardMovie, { type Movie } from "../components/CardMovie";

export default function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/auth/login");
        setLoading(false);
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const [profile, favoriteIds] = await Promise.all([
          getUserProfile(user.uid),
          getUserFavorites(user.uid),
        ]);
        if (profile?.username) setUsername(profile.username);

        const movies = await Promise.all(
          favoriteIds.map((id) => getMovieById(id))
        );
        setFavoriteMovies(
          movies.filter((m): m is NonNullable<typeof m> => m != null) as Movie[]
        );
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

  const displayName = username || user.email?.split("@")[0] || "Utilisateur";

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-stone-800">
            Bonjour, {displayName}
          </h1>
          <p className="text-stone-500 mt-1">{user.email}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-800 mb-4">
            Mes favoris ({favoriteMovies.length})
          </h2>
          {favoriteMovies.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-stone-500">
              <p>Vous n'avez pas encore de films en favoris.</p>
              <p className="mt-2 text-sm">
                Ajoutez des films en cliquant sur le cœur depuis la page d'accueil.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {favoriteMovies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

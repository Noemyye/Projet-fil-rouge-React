import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, addComment, getUserProfile } from "../firebase";

interface CreateCommentProps {
  movieId: string;
  onCommentAdded: () => void;
}

export default function CreateComment({ movieId, onCommentAdded }: CreateCommentProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      navigate("/auth/login");
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Écrivez un commentaire.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const profile = await getUserProfile(user.uid);
      await addComment(
        movieId,
        user.uid,
        user.email ?? "",
        profile?.username,
        trimmed
      );
      setText("");
      onCommentAdded();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du commentaire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          placeholder="Écrivez un commentaire..."
          className="w-full resize-none min-h-[80px] px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        {error && (
          <p className="text-sm text-red-300">{error}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-stone-600 hover:bg-stone-700 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Publier"}
          </button>
        </div>
      </form>
    </section>
  );
}

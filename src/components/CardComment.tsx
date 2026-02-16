import { auth, deleteComment, toggleCommentLike, type CommentDoc } from "../firebase";
import Avatar from "./Avatar";
import Heart from "../assets/heart.png";
import HeartFilled from "../assets/heart_b.png";
import { useNavigate } from "react-router-dom";

interface CardCommentProps {
  comment: CommentDoc & { id: string; createdAt: unknown };
  onCommentChanged: () => void;
}

function formatDate(createdAt: unknown): string {
  if (!createdAt || typeof createdAt !== "object") return "";
  const t = createdAt as { seconds?: number };
  if (typeof t.seconds !== "number") return "";
  const d = new Date(t.seconds * 1000);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default function CardComment({ comment, onCommentChanged }: CardCommentProps) {
  const currentUserId = auth.currentUser?.uid;
  const navigate = useNavigate();

  const likes = Array.isArray(comment.likes) ? comment.likes : [];
  const likesCount = typeof comment.likesCount === "number" ? comment.likesCount : likes.length;
  const isLiked = Boolean(currentUserId && likes.includes(currentUserId));

  const handleDelete = async () => {
    if (!confirm("Supprimer ce commentaire ?")) return;
    try {
      await deleteComment(comment.id);
      onCommentChanged();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    if (!currentUserId) {
      navigate("/auth/login");
      return;
    }
    try {
      await toggleCommentLike(comment.id, currentUserId, !isLiked);
      onCommentChanged();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Avatar />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-white">
              {comment.username || comment.userEmail?.split("@")[0] || "Anonyme"}
            </span>
            <span className="text-xs text-white/60">
              {comment.userEmail}
              <span className="mx-1">•</span>
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={handleLike}
            className="group flex items-center gap-1.5 text-white/80 hover:text-white transition"
            aria-label={isLiked ? "Retirer le like" : "Ajouter un like"}
          >
            <img
              src={isLiked ? Heart : HeartFilled}
              alt=""
              className="w-5 h-5 transition-transform duration-200 group-active:scale-90"
            />
            <span className="text-sm tabular-nums">{likesCount}</span>
          </button>
          {currentUserId === comment.userId && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-sm text-red-300 hover:text-red-200 hover:underline"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      <p className="text-white/90 break-words pl-8 sm:pl-12">{comment.text}</p>
    </li>
  );
}

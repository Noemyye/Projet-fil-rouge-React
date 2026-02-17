import { useEffect, useState, useCallback } from "react";
import { getCommentsByMovieId, type CommentDoc } from "../firebase";
import CardComment from "./CardComment";

type CommentItem = CommentDoc & { id: string; createdAt: unknown };

interface ListCommentsProps {
  movieId: string;
}

export default function ListComments({ movieId }: ListCommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshComments = useCallback(() => {
    getCommentsByMovieId(movieId)
      .then((list) => setComments(list as CommentItem[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [movieId]);

  useEffect(() => {
    setLoading(true);
    refreshComments();
  }, [refreshComments]);

  if (loading) return <div className="text-white/70 text-sm">Chargement...</div>;

  if (comments.length === 0) {
    return (
      <p className="text-white/70 text-sm">Aucun commentaire pour l'instant.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 w-full max-w-2xl">
      {comments.map((comment) => (
        <CardComment
          key={comment.id}
          comment={comment}
          onCommentChanged={refreshComments}
        />
      ))}
    </ul>
  );
}

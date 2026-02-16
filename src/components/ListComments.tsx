import { type CommentDoc } from "../firebase";
import CardComment from "./CardComment";

interface ListCommentsProps {
  comments: (CommentDoc & { id: string; createdAt: unknown })[];
  onCommentsChanged: () => void;
}

export default function ListComments({ comments, onCommentsChanged }: ListCommentsProps) {
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
          onCommentChanged={onCommentsChanged}
        />
      ))}
    </ul>
  );
}

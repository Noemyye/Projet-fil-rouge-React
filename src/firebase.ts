import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore"
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc, deleteDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "projet-fil-rouge-web-front",
  storageBucket: "projet-fil-rouge-web-front.firebasestorage.app",
  messagingSenderId: "938990585347",
  appId: "1:938990585347:web:afa7e88d4d1dbb5ccbb036",
  measurementId: "G-53KNFLBL7Y"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export const getMoviesBySaga = async (saga: string) => {
  const q = query(
    collection(db, "movies"),
    where("saga", "==", saga)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getAllMovies = async () => {
  const snapshot = await getDocs(collection(db, "movies"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getMovieById = async (movieId: string) => {
  const movieDoc = await getDoc(doc(db, "movies", movieId));
  
  if (!movieDoc.exists()) {
    return null;
  }

  return {
    id: movieDoc.id,
    ...movieDoc.data()
  };
};

export const addMovieToFavorites = async (userId: string, movieId: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(movieId)
  });
};

export const removeMovieFromFavorites = async (userId: string, movieId: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(movieId)
  });
};

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) {
    return [];
  }
  const data = userDoc.data();
  return (data.favorites as string[]) || [];
};

export const getUserProfile = async (userId: string): Promise<{ username?: string } | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) return null;
  const data = userDoc.data();
  return { username: data.username as string | undefined };
};

export interface CommentDoc {
  id: string;
  movieId: string;
  userId: string;
  userEmail: string;
  username?: string;
  text: string;
  createdAt: ReturnType<typeof Timestamp.now>;
  likes?: string[];
  likesCount?: number;
}

export const addComment = async (
  movieId: string,
  userId: string,
  userEmail: string,
  username: string | undefined,
  text: string
) => {
  const ref = await addDoc(collection(db, "comments"), {
    movieId,
    userId,
    userEmail,
    username: username ?? null,
    text: text.trim(),
    createdAt: Timestamp.now(),
    likes: [],
    likesCount: 0,
  });
  return ref.id;
};

export const getCommentsByMovieId = async (movieId: string) => {
  const q = query(
    collection(db, "comments"),
    where("movieId", "==", movieId)
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt,
  })) as (Omit<CommentDoc, "id"> & { id: string; createdAt: unknown })[];
  list.sort((a, b) => {
    const ta = a.createdAt as { seconds?: number };
    const tb = b.createdAt as { seconds?: number };
    return (tb.seconds ?? 0) - (ta.seconds ?? 0);
  });
  return list;
};

export const deleteComment = async (commentId: string) => {
  await deleteDoc(doc(db, "comments", commentId));
};

export const toggleCommentLike = async (
  commentId: string,
  userId: string,
  shouldLike: boolean
) => {
  const commentRef = doc(db, "comments", commentId);
  
  const commentSnap = await getDoc(commentRef);
  if (!commentSnap.exists()) return;
  
  const data = commentSnap.data();
  const currentLikes: string[] = Array.isArray(data.likes) ? data.likes : [];
  
  let newLikes: string[];
  if (shouldLike) {
    newLikes = currentLikes.includes(userId) ? currentLikes : [...currentLikes, userId];
  } else {
    newLikes = currentLikes.filter((id) => id !== userId);
  }
  
  await updateDoc(commentRef, {
    likes: newLikes,
    likesCount: newLikes.length,
  });
};

export { app, auth, db };

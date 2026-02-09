/**
 * Map des affiches en local (sans Firebase Storage).
 * En Firestore, mets dans le champ "img" :
 * - une clé de ce map (ex. "end-game") pour utiliser une image du projet
 * - ou une URL complète (https://...) pour une image hébergée ailleurs
 */

import endGame from "../assets/end-game.jpg";
import imagesJpg from "../assets/images.jpg";

export const POSTER_IMAGES: Record<string, string> = {
  "end-game": endGame,
  "end_game": endGame,
  "images": imagesJpg,
};

export function getPosterSrc(imgValue: string | undefined): string {
  if (!imgValue) return endGame;
  if (imgValue.startsWith("http://") || imgValue.startsWith("https://")) {
    return imgValue;
  }
  return POSTER_IMAGES[imgValue] ?? endGame;
}

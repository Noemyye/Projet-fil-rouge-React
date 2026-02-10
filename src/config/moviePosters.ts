import endGame from "../assets/end-game.jpg";
import imagesJpg from "../assets/images.jpg";

export const POSTER_IMAGES: Record<string, string> = {
  "end-game": endGame,
  "end_game": endGame,
  "images": imagesJpg,
};

export function getPosterSrc(imgValue: string | undefined): string {
  if (!imgValue) return "";
  if (imgValue.startsWith("http://") || imgValue.startsWith("https://")) {
    return imgValue;
  }
  return POSTER_IMAGES[imgValue] ?? endGame;
}

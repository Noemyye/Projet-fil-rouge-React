// Types et config pour rendre la page d'accueil dynamique selon la saga

export type SagaId = "marvel" | "hungergames" | "starwars";

export interface SagaCharacterImage {
  src: string;
  alt: string;
  className?: string;
}

export interface SagaConfig {
  /** Image de fond de la hero section */
  backgroundImage: string;
  /** Personnages à gauche */
  leftImages: SagaCharacterImage[];
  /** Personnages à droite */
  rightImages: SagaCharacterImage[];
  /** Classe Tailwind pour la section des films (ex: bg-red-900, bg-amber-900) */
  sectionBgColor: string;
}

// Import des assets (les chemins sont résolus au build)
import MarvelBg from "../assets/marvel-logo.jpg";
import MarvelAmerica from "../assets/america-removebg-preview.png";
import MarvelHulk from "../assets/hulk-removebg-preview.png";
import MarvelWidow from "../assets/widow-removebg-preview.png";
import MarvelSpider from "../assets/spider-removebg-preview.png";
import MarvelThor from "../assets/thor-removebg-preview.png";
import MarvelIron from "../assets/iron-removebg-preview.png";
import HGBg from "../assets/hunger-games-font.png";
import SWBg from "../assets/Star-wars-logo-new-tall.png";

const dropShadowStyle = {
  filter: "drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))",
} as const;

export const SAGA_CONFIG: Record<SagaId, SagaConfig> = {
  marvel: {
    backgroundImage: MarvelBg,
    sectionBgColor: "bg-red-900",
    leftImages: [
      { src: MarvelAmerica, alt: "Captain America", className: "w-100 h-auto -translate-x-30" },
      { src: MarvelHulk, alt: "Hulk", className: "w-80 h-auto -translate-x-30 rotate-20" },
      { src: MarvelWidow, alt: "Black Widow", className: "w-80 h-auto -translate-x-30 rotate-20" },
    ],
    rightImages: [
      { src: MarvelSpider, alt: "Spider-Man", className: "w-70 h-auto translate-x-25 -rotate-5" },
      { src: MarvelThor, alt: "Thor", className: "w-90 h-auto translate-x-15 -rotate-5" },
      { src: MarvelIron, alt: "Iron Man", className: "w-90 h-auto translate-x-30 -rotate-15" },
    ],
  },
  hungergames: {
    backgroundImage: HGBg,
    sectionBgColor: "bg-amber-900",
    leftImages: [],
    rightImages: [],
  },
  starwars: {
    backgroundImage: SWBg,
    sectionBgColor: "bg-sky-900",
    leftImages: [],
    rightImages: [],
  },
};

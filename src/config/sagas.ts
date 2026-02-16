export type SagaId = "marvel" | "hungergames" | "starwars";

export interface SagaCharacterImage {
  src: string;
  alt: string;
  className?: string;
}

export interface SagaConfig {
  backgroundImage: string;
  leftImages: SagaCharacterImage[];
  rightImages: SagaCharacterImage[];
  sectionBgColor: string;
}

import MarvelBg from "../assets/marvel-logo.jpg";
import MarvelAmerica from "../assets/america-removebg-preview.png";
import MarvelHulk from "../assets/hulk-removebg-preview.png";
import MarvelWidow from "../assets/widow-removebg-preview.png";
import MarvelSpider from "../assets/spider-removebg-preview.png";
import MarvelThor from "../assets/thor-removebg-preview.png";
import MarvelIron from "../assets/iron-removebg-preview.png";
import HG1 from "../assets/katness1.png";
import HG2 from "../assets/katness2.png";
import HG3 from "../assets/katness3.png";
import HG4 from "../assets/katness4.png";
import HG5 from "../assets/katness5.png";
import HG6 from "../assets/katness6.png";
import Luke from "../assets/luke-removebg-preview.png"
import Yoda from "../assets/yoda-removebg-preview.png"
import Vador from "../assets/darkvador-removebg-preview.png"
import BB8 from "../assets/BB-8-removebg-preview.png"
import R2D2 from "../assets/R2-D2-removebg-preview.png"
import StormTrooper from "../assets/stormtrooper-removebg-preview.png"
import Vaisseau from "../assets/vaisseau-removebg-preview.png"
import Faucon from "../assets/faucon-removebg-preview.png"
import Leia from "../assets/leia-removebg-preview.png"
import darkmaul from "../assets/darkmaul-removebg-preview.png"  
import HGBg from "../assets/hunger-games.jpg";
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
    sectionBgColor: "bg-orange-900",
    leftImages: [
      { src: HG6, alt: "Katness6", className: "w-90 h-auto -translate-x-20 -translate-y-10" },
      { src: HG4, alt: "Katness4", className: "w-85 h-auto -translate-x-35 rotate-20" },
      { src: HG1, alt: "Katness1", className: "w-80 h-auto -translate-x-15 -rotate-5" },
    ],
    rightImages: [
      { src: HG5, alt: "Katness5", className: "w-70 h-auto translate-x-40 -rotate-5" },
      { src: HG2, alt: "Katness2", className: "w-80 h-auto translate-x-30 -rotate-10 rotate-y-180" },
      { src: HG3, alt: "Katness3", className: "w-100 h-auto translate-x-45 -rotate-20 rotate-y-180" },
    ],
  },
  starwars: {
    backgroundImage: SWBg,
    sectionBgColor: "bg-black",
    leftImages: [
      { src: BB8, alt: "BB8", className: "w-55 h-auto -translate-x-15 rotate-20" },
      { src: Luke, alt: "Luke Skywalker", className: "w-170 h-auto -translate-x-55 rotate-10 rotate-y-180" },
      { src: Yoda, alt: "Yoda", className: "w-80 h-auto -translate-x-20 rotate-25" },
      { src: Faucon, alt: "Millennium Falcon", className: "w-100 h-auto -translate-x-30 rotate-20 rotate-y-180" },
      { src: Leia, alt: "Princess Leia", className: "w-70 h-auto -translate-x-15 rotate-10 translate-y-10 rotate-y-180" },
    ],
    rightImages: [
      { src: Vador, alt: "Darth Vader", className: "w-80 h-auto translate-x-70 -rotate-15" },
      { src: StormTrooper, alt: "Stormtrooper", className: "w-125 h-auto translate-x-35 -rotate-10 translate-y-10" },
      { src: R2D2, alt: "R2-D2", className: "w-60 h-auto translate-x-75 -rotate-10 translate-y-10" },
      { src: Vaisseau, alt: "Death Star", className: "w-80 h-auto translate-x-50 rotate-20 translate-y-20" },
    ],
  },
};

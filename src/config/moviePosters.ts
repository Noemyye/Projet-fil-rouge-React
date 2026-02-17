import avengers from "../assets/avengers.jpg";
import thor from "../assets/thor.jpg";
import ironman from "../assets/iron_man.jpg";
import ironman2 from "../assets/iron_man2.jpg";
import hulk from "../assets/hulk.webp";
import captainamerica from "../assets/captain_america.jpg";
import hungergames1 from "../assets/hungergames1.jpg";
import hungergames2 from "../assets/hungergames2.jpg";
import hungergames3 from "../assets/hungergames3.jpg";
import hungergames4 from "../assets/hungergames4.jpg";
import starwars1 from "../assets/starwars1.webp";
import starwars2 from "../assets/starwars2.jpg";
import starwars3 from "../assets/starwars3.jpg";
import starwars4 from "../assets/starwars4.jpg";
import starwars5 from "../assets/starwars5.jpg";
import starwars6 from "../assets/starwars6.jpg";
import starwars7 from "../assets/starwars7.jpg";
import starwars8 from "../assets/starwars8.jpg";
import starwars9 from "../assets/starwars9.jpg";


export function getPosterSrc(imgValue: string): string {
 
  const POSTER_IMAGES: Record<string, string> = {
    "avengers": avengers,
    "thor": thor,
    "ironman": ironman,
    "ironman2": ironman2,
    "hulk": hulk,
    "captainamerica": captainamerica,
    "hungergames1": hungergames1,
    "hungergames2": hungergames2,
    "hungergames3": hungergames3,
    "hungergames4": hungergames4,
    "starwars1": starwars1,
    "starwars2": starwars2,
    "starwars3": starwars3,
    "starwars4": starwars4,
    "starwars5": starwars5,
    "starwars6": starwars6,
    "starwars7": starwars7,
    "starwars8": starwars8,
    "starwars9": starwars9,
  };

  return POSTER_IMAGES[imgValue];
}

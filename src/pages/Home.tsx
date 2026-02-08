import Marvel from '../assets/marvel-logo.jpg';
import Mouse from '../assets/mouse.png';
import Widow from '../assets/widow-removebg-preview.png';
import Spider from '../assets/spider-removebg-preview.png';
import Thor from '../assets/thor-removebg-preview.png';
import Hulk from '../assets/hulk-removebg-preview.png';
import Ironman from '../assets/iron-removebg-preview.png';
import America from '../assets/america-removebg-preview.png';
import { useState, useEffect } from 'react';
import CardMovie from '../components/CardMovie';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
     const opacity = Math.max(1 - scrollY / 200, 0);

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  
    return (
      <div className="relative">
        {/* Image Marvel en arrière-plan */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
            <img
                src={Marvel}
                alt="Marvel Background"
                className="w-full h-full object-cover"
            />
        </div>
  
        {/* Contenu principal */}
        <div className="relative w-full h-auto">
            <section className="min-h-screen bg-transparent flex items-end justify-center p-30">
            <div className="absolute top-10 left-0 flex flex-col gap-6">
                <img
                src={America}
                alt="Black Widow"
                className="w-100 h-auto -translate-x-30"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
                <img
                src={Hulk}
                alt="Spider-Man"
                className=" w-80 h-auto -translate-x-30 rotate-20 shadow-black"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
                <img
                src={Widow}
                alt="Thor"
                className="w-80 h-auto -translate-x-30 rotate-20 shadow-black"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
            </div>
            <div 
                className="animate-bounce"
                style={{
                    opacity: opacity, // Appliquer l'opacité calculée
                    transition: 'opacity 0.2s ease-out', // Transition fluide
                }}
            >
                
                <img src={Mouse} className="animate-pulse h-8 w-8 mx-auto"/>
            </div>

            <div className="absolute top-10 right-0 flex flex-col gap-6">
                <img
                src={Spider}
                alt="Spider-Man"
                className="w-70 h-auto translate-x-25 -rotate-5"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
                <img
                src={Thor}
                alt="Black Widow"
                className="w-90 h-auto translate-x-15 -rotate-5"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
                <img
                src={Ironman}
                alt="Thor"
                className="w-90 h-auto translate-x-30 -rotate-15"
                style={{
                    filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))', // Ombre qui suit le contour
                }}
                />
            </div>
            </section>
            <section className="min-h-screen flex items-center justify-center gap-25 text-white bg-red-900">
               <CardMovie /> <CardMovie /> <CardMovie />
            </section>
        </div>
      </div>
    );
  }
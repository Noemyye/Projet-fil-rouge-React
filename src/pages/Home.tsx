import Mouse from '../assets/mouse.png';
import { useState, useEffect } from 'react';
import CardMovie from '../components/CardMovie';
import { SAGA_CONFIG, type SagaId } from '../config/sagas';
import ListMovie from '../components/ListMovie';

const dropShadowStyle = { filter: 'drop-shadow(10px 10px 15px rgba(0, 0, 0, 1))' };

interface HomeProps {
  sagaId: SagaId;
}

export default function Home({ sagaId }: HomeProps) {
  const [scrollY, setScrollY] = useState(0);
  const opacity = Math.max(1 - scrollY / 200, 0);

  const config = SAGA_CONFIG[sagaId];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Image de fond selon la saga */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <img
          src={config.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full h-auto">
        <section className="min-h-screen bg-transparent flex items-end justify-center p-30">
          {/* Personnages à gauche (si configurés) */}
          {config.leftImages.length > 0 && (
            <div className="absolute top-10 left-0 flex flex-col gap-6">
              {config.leftImages.map((img) => (
                <img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className={img.className}
                  style={dropShadowStyle}
                />
              ))}
            </div>
          )}

          {/* Indicateur de scroll */}
          <div
            className="animate-bounce"
            style={{ opacity, transition: 'opacity 0.2s ease-out' }}
          >
            <img src={Mouse} className="animate-pulse h-8 w-8 mx-auto" alt="" />
          </div>

          {/* Personnages à droite (si configurés) */}
          {config.rightImages.length > 0 && (
            <div className="absolute top-10 right-0 flex flex-col gap-6">
              {config.rightImages.map((img) => (
                <img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className={img.className}
                  style={dropShadowStyle}
                />
              ))}
            </div>
          )}
        </section>

        <section
          className={`min-h-screen flex flex-col sm:flex-row flex-wrap items-center justify-center gap-10 px-4 py-12 text-white ${config.sectionBgColor} sm:gap-8 lg:gap-12`}
        >
            <ListMovie saga={sagaId}/>
        </section>
      </div>
    </div>
  );
}

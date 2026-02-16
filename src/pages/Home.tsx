import Mouse from '../assets/mouse.png';
import { useState, useEffect } from 'react';
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
      <div className="hidden lg:block fixed top-0 left-0 w-full h-screen -z-10">
        <img
          src={config.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full h-auto">
        <section className="min-h-[53.5vw] xl:min-h-screen bg-transparent flex items-end justify-center p-6 sm:p-30 lg:min-h-0">
          <div className="absolute top-0 left-0 w-full -z-10 lg:hidden">
            <img
              src={config.backgroundImage}
              alt=""
              className="w-full h-auto"
            />
          </div>
          {config.leftImages.length > 0 && (
            <div className="absolute top-10 left-0 hidden lg:flex flex-col gap-6">
              {config.leftImages.map((img, index) => (
                <img
                  key={`${sagaId}-left-${index}-${img.alt}`}
                  src={img.src}
                  alt={img.alt}
                  className={img.className}
                  style={dropShadowStyle}
                />
              ))}
            </div>
          )}

          <div
            className="hidden lg:block animate-bounce"
            style={{ opacity, transition: 'opacity 0.2s ease-out' }}
          >
            <img src={Mouse} className="animate-pulse h-8 w-8 mx-auto" alt="" />
          </div>

          {config.rightImages.length > 0 && (
            <div className="absolute top-10 right-0 hidden lg:flex flex-col gap-6">
              {config.rightImages.map((img, index) => (
                <img
                  key={`${sagaId}-right-${index}-${img.alt}`}
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
          className={`xl:min-h-screen flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 px-4 py-10 text-white ${config.sectionBgColor} sm:gap-8 lg:gap-12`}
        >
            <ListMovie saga={sagaId}/>
        </section>
      </div>
    </div>
  );
}

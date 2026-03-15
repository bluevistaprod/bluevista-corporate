import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  videoId: string;
  title: string;
}

/**
 * Composant optimisé pour afficher une vidéo Vimeo en arrière-plan
 * Force le remplissage complet du conteneur sans bandes grises
 */
export function HeroVideo({ videoId, title }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label={title}
    >
      {/* Placeholder gradient while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse" />
      )}

      {/* Video wrapper - force crop to fill container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Lazy-loaded iframe - scaled to cover entire container */}
        {isVisible && (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&h=1440&portrait=false&title=false&byline=false`}
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            frameBorder="0"
            allow="autoplay; muted"
            title={title}
            onLoad={handleIframeLoad}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '130%',
              height: '130%',
              transform: 'translate(-50%, -50%)',
              minWidth: '130%',
              minHeight: '130%',
            }}
          />
        )}
      </div>
    </div>
  );
}

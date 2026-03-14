import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  videoId: string;
  title: string;
}

/**
 * Composant optimisé pour afficher une vidéo Vimeo en arrière-plan
 * Utilise Intersection Observer pour lazy loading et améliore les performances
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
          // Unobserve after video is visible to avoid re-triggering
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
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

      {/* Lazy-loaded iframe */}
      {isVisible && (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&h=1080`}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          frameBorder="0"
          allow="autoplay; muted"
          title={title}
          onLoad={handleIframeLoad}
          style={{ pointerEvents: 'none', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

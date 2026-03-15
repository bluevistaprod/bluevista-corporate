import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  videoId?: string;
  title: string;
  videoUrl?: string;
}

/**
 * Composant optimisé pour afficher une vidéo en arrière-plan
 * Utilise une balise <video> HTML5 qui remplit complètement le conteneur
 * sans bandes grises lors du resize
 */
export function HeroVideo({ title, videoUrl }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gray-900"
      role="img"
      aria-label={title}
    >
      {/* HTML5 Video - fills container completely with object-fit: cover */}
      {isVisible && videoUrl && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          title={title}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Placeholder gradient while loading */}
      {!isVisible && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse" />
      )}
    </div>
  );
}

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  title,
  thumbnail,
  autoplay = false,
  className = "",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // Extraire l'ID Vimeo de l'URL
  const getVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|video\/)(\d+)/);
    return match ? match[1] : null;
  };

  // Extraire l'ID YouTube de l'URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const vimeoId = getVimeoId(videoUrl);
  const youtubeId = getYouTubeId(videoUrl);

  if (!vimeoId && !youtubeId) {
    return <div className="bg-gray-200 rounded-lg p-4">URL vidéo invalide</div>;
  }

  return (
    <div className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Aspect ratio container 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {!isPlaying && thumbnail && (
          <div
            className="absolute inset-0 bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${thumbnail})` }}
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition">
              <Play size={64} className="text-white fill-white" />
            </div>
          </div>
        )}

        {isPlaying && vimeoId && (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?h=&autoplay=1&loop=0&byline=false&portrait=false&title=false`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || "Video"}
          />
        )}

        {isPlaying && youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || "Video"}
          />
        )}

        {!isPlaying && !thumbnail && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer hover:from-gray-700 hover:to-gray-800 transition"
            onClick={() => setIsPlaying(true)}
          >
            <Play size={64} className="text-white fill-white" />
          </div>
        )}
      </div>
    </div>
  );
}

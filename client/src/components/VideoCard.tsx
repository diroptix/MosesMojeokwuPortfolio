import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

interface VideoCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function VideoCard({ project, index, onClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const getVideoId = (url: string): string | null => {
    // Handle Vimeo URLs
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return vimeoMatch[1];

    // Handle YouTube URLs
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
    if (youtubeMatch) return youtubeMatch[1];

    return null;
  };

  const getEmbedUrl = (url: string): string => {
    const videoId = getVideoId(url);
    if (!videoId) return url;

    // Ensure URL is HTTPS
    if (url.includes('vimeo.com')) {
      return `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=0&controls=1`;
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&modestbranding=1`;
    }

    return url.replace('http://', 'https://');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="rounded-xl overflow-hidden border border-white/6 bg-black/40 hover-elevate transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-project-${project.id}`}
    >
      <div 
        className="relative aspect-video"
        onMouseEnter={() => setShowVideo(true)}
        onMouseLeave={() => setShowVideo(false)}
      >
        {/* Always show thumbnail when video is not displayed */}
        {project.thumbnailUrl && !showVideo && (
          <div className="absolute inset-0">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* Show iframe when hovered */}
        <iframe
          src={getEmbedUrl(project.videoUrl)}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: showVideo ? 1 : 0,
            transition: "opacity 0.3s ease"
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <div 
          className="absolute bottom-4 left-4 text-xs backdrop-blur-sm px-3 py-1 rounded font-mono uppercase tracking-wider"
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            letterSpacing: "0.05em"
          }}
          data-testid={`label-project-number-${project.id}`}
        >
          Project · {index + 1}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-base" data-testid={`text-project-title-${project.id}`}>
          {project.title}
        </h4>
        {project.role && (
          <p className="text-sm opacity-60 mt-1" data-testid={`text-project-role-${project.id}`}>
            {project.role}
          </p>
        )}
        <p className="mt-2 text-sm opacity-70 leading-relaxed line-clamp-2" data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </p>
        {project.year && (
          <p className="text-xs opacity-50 mt-2 font-mono" data-testid={`text-project-year-${project.id}`}>
            {project.year}
          </p>
        )}
      </div>
    </motion.article>
  );
}
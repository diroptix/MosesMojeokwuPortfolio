import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

interface VideoCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export function VideoCard({ project, index, onClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getEmbedUrl = (url: string): string => {
    // Ensure URL is HTTPS
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
      <div className="relative aspect-video">
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <iframe
          src={getEmbedUrl(project.videoUrl)}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
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
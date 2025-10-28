import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useLocation } from "wouter";
import type { Project } from "@shared/schema";

interface VideoGalleryProps {
  projects: Project[];
}

function LazyVideoCard({ 
  project, 
  index, 
  isActive, 
  onHoverChange,
  onClick 
}: { 
  project: Project; 
  index: number; 
  isActive: boolean;
  onHoverChange: (id: string | null) => void;
  onClick: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: "200px",
        threshold: 0.01
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="rounded-xl overflow-hidden border border-white/6 bg-black/40 hover-elevate transition-all duration-300 cursor-pointer"
      data-testid={`card-project-${project.id}`}
    >
      <div
        className="relative aspect-video cursor-pointer bg-black/60"
        onMouseEnter={() => onHoverChange(project.id)}
        onMouseLeave={() => onHoverChange(null)}
        data-testid={`video-container-${project.id}`}
      >
        {isVisible ? (
          <ReactPlayer
            url={project.videoUrl}
            playing={isActive}
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playsinline={true}
            controls={false}
            light={project.thumbnailUrl || true}
            config={{
              vimeo: {
                playerOptions: {
                  quality: 'auto',
                  responsive: true
                }
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}

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
        {project.client && (
          <p className="text-sm opacity-60 mt-1" data-testid={`text-project-client-${project.id}`}>
            {project.client}
          </p>
        )}
        <p className="mt-2 text-sm opacity-70 leading-relaxed" data-testid={`text-project-description-${project.id}`}>
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

export function VideoGallery({ projects }: VideoGalleryProps) {
  const [, setLocation] = useLocation();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Work" },
    { value: "brand-campaign", label: "Brand Campaigns" },
    { value: "product-film", label: "Product Films" },
    { value: "case-study", label: "Case Studies" },
    { value: "commercial", label: "Commercials" }
  ];

  const filteredProjects = (selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory))
    .slice(0, 6); // Limit to 6 videos

  useEffect(() => {
    if (hoveredVideo) {
      setActiveVideo(hoveredVideo);
    } else {
      setActiveVideo(null);
    }
  }, [hoveredVideo]);

  return (
    <section id="work" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-12">
          <h3 className="text-2xl lg:text-3xl font-semibold" data-testid="text-section-title">
            Selected Works
          </h3>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/8'
                }`}
                data-testid={`button-category-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-white/60">
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((project, i) => (
              <LazyVideoCard
                key={project.id}
                project={project}
                index={i}
                isActive={activeVideo === project.id}
                onHoverChange={setHoveredVideo}
                onClick={() => setLocation(`/project/${project.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

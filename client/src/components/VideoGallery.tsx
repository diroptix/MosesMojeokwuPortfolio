import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { VideoCard } from "./VideoCard";
import type { Project } from "@shared/schema";

interface VideoGalleryProps {
  projects: Project[];
}

export function VideoGallery({ projects }: VideoGalleryProps) {
  const [, setLocation] = useLocation();

  const sortedProjects = projects
    ? [...projects]
        .sort((a, b) => {
          // Sort by year first (newest first)
          const yearDiff = parseInt(b.year || "0") - parseInt(a.year || "0");
          if (yearDiff !== 0) return yearDiff;
          
          // Then by creation date (newer items first)
          return b.createdAt > a.createdAt ? 1 : -1;
        })
        .slice(0, 6) // Limit to 6 videos max
    : [];

  return (
    <section id="work" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-8 lg:mb-12">
          <h3 className="text-2xl lg:text-3xl font-semibold" data-testid="text-section-title">
            Featured Works
          </h3>
          <p className="mt-2 text-white/60">
            Selected highlights from our creative portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-white/60">
              No projects available.
            </div>
          ) : (
            sortedProjects.map((project, i) => (
              <VideoCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setLocation(`/project/${project.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

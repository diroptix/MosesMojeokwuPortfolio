import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { VideoCard } from "./VideoCard";
import type { Project } from "@shared/schema";

interface VideoGalleryProps {
  projects: Project[];
}



export function VideoGallery({ projects }: VideoGalleryProps) {
  const [, setLocation] = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "Featured Work" },
    { value: "brand-campaign", label: "Brand Campaigns" },
    { value: "commercial", label: "Commercials" },
    { value: "case-study", label: "Case Studies" },
    { value: "product-film", label: "Product Films" }
  ];

  const filteredProjects = projects
    ? (selectedCategory === "all" 
        ? [...projects] 
        : projects.filter(p => p.category === selectedCategory))
        .sort((a, b) => {
          // Sort by year first (newest first)
          const yearDiff = parseInt(b.year || "0") - parseInt(a.year || "0");
          if (yearDiff !== 0) return yearDiff;
          
          // Then by vimeoId (newer videos have higher IDs)
          return parseInt(b.vimeoId || "0") - parseInt(a.vimeoId || "0");
        })
        .slice(0, 6) // Limit to 6 videos
    : [];

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

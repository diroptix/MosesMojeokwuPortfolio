import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CursorBeam } from "@/components/CursorBeam";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { VideoGallery } from "@/components/VideoGallery";
import { GraphicDesignGallery } from "@/components/GraphicDesignGallery";
import { TikTokGallery } from "@/components/TikTokGallery";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import type { Project, TikTokVideo, GraphicDesign } from "@shared/schema";

export default function Portfolio() {
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: tiktokVideos, isLoading: tiktokLoading } = useQuery<TikTokVideo[]>({
    queryKey: ["/api/tiktok-videos"],
  });

  const { data: graphicDesigns, isLoading: designsLoading } = useQuery<GraphicDesign[]>({
    queryKey: ["/api/graphic-designs"],
  });

  const isLoading = projectsLoading || tiktokLoading || designsLoading;

  return (
    <div className="min-h-screen text-white antialiased relative overflow-x-hidden">
      <CursorBeam />
      
      {/* Cinematic background with parallax gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, hsl(243, 75%, 25%), transparent 60%, black)",
          }}
        />
        
        {/* Subtle vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
          }}
        />
      </div>

      <Navigation />

      <main className="relative z-10">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg opacity-70"
              data-testid="text-loading"
            >
              Loading portfolio...
            </motion.div>
          </div>
        ) : projects && projects.length > 0 ? (
          <>
            <HeroSection featuredVideoUrl={projects[0].videoUrl} />
            <VideoGallery projects={projects} />
            <TikTokGallery videos={tiktokVideos || []} />
            <GraphicDesignGallery designs={graphicDesigns || []} />
            <ContactForm />
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center" data-testid="container-empty-state">
              <h2 className="text-2xl font-semibold mb-4">No Projects Yet</h2>
              <p className="text-lg opacity-70">Check back soon for new work.</p>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}

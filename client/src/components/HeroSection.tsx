import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  featuredVideoUrl: string;
}

export function HeroSection({ featuredVideoUrl }: HeroSectionProps) {
  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (workSection) {
      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] sm:min-h-screen flex items-center pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 sm:py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{ letterSpacing: "-0.02em" }}
              data-testid="text-hero-headline"
            >
              Crafting reality through illusion.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-base sm:text-lg opacity-80 leading-relaxed"
              style={{ lineHeight: "1.7" }}
              data-testid="text-hero-description"
            >
              I shape light, motion and narrative into strategic brand systems — cinematic work that lives beyond the frame. Explore case studies that merge technical precision with hyperreal aesthetics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                onClick={scrollToWork}
                size="default"
                className="rounded-lg backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                variant="ghost"
                data-testid="button-explore-work"
              >
                Explore Work
              </Button>
              <Button
                asChild
                size="default"
                variant="outline"
                className="rounded-lg border-white/10"
                data-testid="button-contact"
              >
                <a href="mailto:hello@grittyflint.com">Contact</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-3 w-full rounded-2xl overflow-hidden border border-white/6"
            data-testid="container-hero-video"
          >
            <div className="aspect-video bg-black/40">
              <ReactPlayer
                url={featuredVideoUrl}
                width="100%"
                height="100%"
                light={true}
                playIcon={
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm hover-elevate active-elevate-2 transition-transform hover:scale-105">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                }
                controls={true}
                config={{
                  vimeo: {
                    playerOptions: {
                      quality: '720p',
                      responsive: true,
                      preload: true
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

import type { TikTokVideo } from "@shared/schema";

interface TikTokGalleryProps {
  videos: TikTokVideo[];
}

export function TikTokGallery({ videos }: TikTokGalleryProps) {
  return (
    <section id="tiktok" className="relative py-16 lg:py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-8 lg:mb-12">
          TikTok Highlights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {videos.slice(0, 3).map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-[9/16] relative rounded-xl overflow-hidden border border-white/6 bg-black/40"
            >
              <iframe
                src={`https://www.tiktok.com/embed/${video.videoUrl.split('/video/')[1]}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
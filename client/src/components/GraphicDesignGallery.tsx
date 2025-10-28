import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { GraphicDesign } from "@shared/schema";

export function GraphicDesignGallery() {
  const { data: designs, isLoading } = useQuery<GraphicDesign[]>({
    queryKey: ["/api/graphic-designs"],
  });

  const [selectedDesign, setSelectedDesign] = useState<GraphicDesign | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!designs) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        if (selectedDesign) {
          const newIndex = (selectedIndex - 1 + designs.length) % designs.length;
          setSelectedIndex(newIndex);
          setSelectedDesign(designs[newIndex]);
        }
        break;
      case 'ArrowRight':
        if (selectedDesign) {
          const newIndex = (selectedIndex + 1) % designs.length;
          setSelectedIndex(newIndex);
          setSelectedDesign(designs[newIndex]);
        }
        break;
      case 'Escape':
        setSelectedDesign(null);
        break;
    }
  }, [selectedDesign, selectedIndex, designs]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (isLoading) {
    return (
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center text-white/60">Loading designs...</div>
        </div>
      </section>
    );
  }

  if (!designs || designs.length === 0) {
    return null;
  }

  return (
    <section id="designs" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-8 lg:mb-12">
          <h3 className="text-2xl lg:text-3xl font-semibold text-white" data-testid="text-graphic-design-title">
            Graphic Design
          </h3>
          <p className="mt-2 text-white/60">
            High-resolution layouts and visual compositions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {designs.map((design, i) => (
            <motion.article
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              onClick={() => {
                setSelectedDesign(design);
                setSelectedIndex(i);
              }}
              className="relative rounded-lg overflow-hidden border border-white/6 bg-black/40 hover-elevate transition-all duration-300 cursor-pointer group"
              data-testid={`card-design-${design.id}`}
              style={{ aspectRatio: "214/306" }}
            >
              <img
                src={design.thumbnailUrl || design.imageUrl}
                alt={design.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-sm font-semibold text-white line-clamp-2">
                    {design.title}
                  </h4>
                  {design.client && (
                    <p className="text-xs text-white/60 mt-1">{design.client}</p>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Maximize2 className="w-5 h-5 text-white/80" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDesign && designs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-8"
            data-testid="modal-design-fullview"
          >
            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = (selectedIndex - 1 + designs.length) % designs.length;
                  setSelectedIndex(newIndex);
                  setSelectedDesign(designs[newIndex]);
                }}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover-elevate active-elevate-2 flex items-center justify-center text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = (selectedIndex + 1) % designs.length;
                  setSelectedIndex(newIndex);
                  setSelectedDesign(designs[newIndex]);
                }}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover-elevate active-elevate-2 flex items-center justify-center text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDesign(null);
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover-elevate active-elevate-2 flex items-center justify-center text-white z-10"
              data-testid="button-close-modal"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-full overflow-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <motion.div
                    className="relative w-full"
                    style={{
                      maxHeight: "85vh",
                      aspectRatio: `${selectedDesign.width}/${selectedDesign.height}`
                    }}
                  >
                    <motion.img
                      layoutId={`design-${selectedDesign.id}`}
                      src={selectedDesign.imageUrl}
                      alt={selectedDesign.title}
                      className="absolute inset-0 w-full h-full rounded-xl border border-white/10 object-contain"
                    />
                  </motion.div>
                </div>

                <div className="bg-black/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2" data-testid="text-design-title">
                      {selectedDesign.title}
                    </h2>
                    {selectedDesign.client && (
                      <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                        <span className="font-mono uppercase tracking-wider">Client:</span>
                        <span>{selectedDesign.client}</span>
                      </div>
                    )}
                    {selectedDesign.year && (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span className="font-mono uppercase tracking-wider">Year:</span>
                        <span>{selectedDesign.year}</span>
                      </div>
                    )}
                  </div>

                  {selectedDesign.description && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/70 leading-relaxed">
                        {selectedDesign.description}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4">
                    <div className="text-xs text-white/50 font-mono">
                      Dimensions: {selectedDesign.width} × {selectedDesign.height} px
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

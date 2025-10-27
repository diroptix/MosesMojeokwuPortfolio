import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-xl border-b border-white/10"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight" data-testid="text-site-title">
            OPTIX — Moses Mojeokwu
          </h1>
          <p className="text-xs lg:text-sm opacity-70 mt-0.5">
            Director of Photography · Creative Director · Cinematographer · Visual Designer
          </p>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-6 text-sm opacity-80">
          <a
            href="https://www.behance.net/grittyflint"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-elevate active-elevate-2 flex items-center gap-1 px-3 py-2 rounded-md transition-opacity hover:opacity-100"
            data-testid="link-behance"
            aria-label="View Behance profile"
          >
            <span className="hidden sm:inline">Behance</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://vimeo.com/grittyflint"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-elevate active-elevate-2 flex items-center gap-1 px-3 py-2 rounded-md transition-opacity hover:opacity-100"
            data-testid="link-vimeo"
            aria-label="View Vimeo profile"
          >
            <span className="hidden sm:inline">Vimeo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

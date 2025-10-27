import { ExternalLink, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm opacity-60 text-center sm:text-left" data-testid="text-footer-description">
            Built with craft — A hyperreal portfolio showcasing cinematic storytelling.
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@grittyflint.com"
              className="flex items-center gap-2 text-sm hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-opacity hover:opacity-100 opacity-80"
              data-testid="link-email"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </a>
            <a
              href="https://www.behance.net/grittyflint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-opacity hover:opacity-100 opacity-80"
              data-testid="link-footer-behance"
              aria-label="View Behance profile"
            >
              <span className="hidden sm:inline">Behance</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://vimeo.com/grittyflint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-opacity hover:opacity-100 opacity-80"
              data-testid="link-footer-vimeo"
              aria-label="View Vimeo profile"
            >
              <span className="hidden sm:inline">Vimeo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-xs opacity-50" data-testid="text-copyright">
          © {new Date().getFullYear()} Moses Mojeokwu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

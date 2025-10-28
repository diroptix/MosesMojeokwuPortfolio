
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${params.id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-lg opacity-70">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
          <Button onClick={() => setLocation("/")}>Back to Portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <header className="border-b border-white/10 backdrop-blur-xl bg-black/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="gap-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="aspect-video rounded-xl overflow-hidden border border-white/6 bg-black/60"
              >
                <ReactPlayer
                  url={project.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-project-title">
                  {project.title}
                </h1>
                
                {project.client && (
                  <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
                    <span className="font-mono uppercase tracking-wider">Client:</span>
                    <span>{project.client}</span>
                  </div>
                )}
                
                {project.year && (
                  <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
                    <span className="font-mono uppercase tracking-wider">Year:</span>
                    <span>{project.year}</span>
                  </div>
                )}
                
                {project.role && (
                  <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
                    <span className="font-mono uppercase tracking-wider">Role:</span>
                    <span>{project.role}</span>
                  </div>
                )}
                
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider mt-4">
                  {project.category.replace('-', ' ')}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-white/70 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.credits && (
                <div className="border-t border-white/10 pt-6">
                  <h2 className="text-xl font-semibold mb-3">Credits</h2>
                  <pre className="text-sm text-white/70 whitespace-pre-line font-sans">
                    {project.credits}
                  </pre>
                </div>
              )}

              {project.vimeoId && (
                <div className="border-t border-white/10 pt-6">
                  <a
                    href={`https://vimeo.com/${project.vimeoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  >
                    View on Vimeo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}

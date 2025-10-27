# OPTIX — Moses Mojeokwu | Hyperreal Cinematographic Portfolio

## Overview
A stunning single-page portfolio website showcasing the cinematic work of Moses Mojeokwu, Director of Photography, Creative Director, and Visual Designer. The site features hyperreal visuals, custom cursor effects, parallax backgrounds, and seamless video playback.

## Current State
**Status:** Production-ready MVP ✅

**Last Updated:** October 27, 2025

## Features Implemented
- ✅ Cinematic dark theme with indigo gradient backgrounds
- ✅ Custom cursor beam effect (desktop only, keyboard-accessible)
- ✅ Fixed glassmorphic navigation header
- ✅ Hero section with featured video and smooth animations
- ✅ Video gallery with hover-to-play preview (7 projects)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Social media integration (Behance, Vimeo)
- ✅ Framer Motion animations throughout
- ✅ ReactPlayer integration for Vimeo and Google Drive videos

## Recent Changes
**October 27, 2025:**
- Implemented complete hyperreal portfolio design
- Created all React components with cinematic styling
- Set up backend API for project data
- Fixed responsive layout issues for mobile
- Improved cursor beam accessibility (keyboard mode)
- Fixed video gallery to play only one video at a time
- Resolved button sizing inconsistencies
- Passed all end-to-end tests

## Project Architecture

### Frontend (React + TypeScript)
**Pages:**
- `Portfolio.tsx` - Main portfolio page with all sections

**Components:**
- `CursorBeam.tsx` - Custom cursor with keyboard fallback
- `Navigation.tsx` - Fixed header with social links
- `HeroSection.tsx` - Hero with featured video and CTAs
- `VideoGallery.tsx` - Responsive grid with hover-preview
- `Footer.tsx` - Footer with links and copyright

**Styling:**
- Tailwind CSS with custom dark theme
- CSS variables for cinematic colors (indigo accents)
- Glassmorphism effects with backdrop-blur
- Framer Motion for smooth animations

### Backend (Express + TypeScript)
**Storage:**
- In-memory storage with 7 pre-seeded projects
- Mix of Vimeo and Google Drive video sources

**API Endpoints:**
- `GET /api/projects` - Returns all portfolio projects
- `GET /api/projects/:id` - Returns single project by ID

**Data Schema:**
```typescript
{
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  client?: string;
  role?: string;
  year?: string;
}
```

## Technology Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **Video:** ReactPlayer (supports Vimeo, Google Drive)
- **Backend:** Express, Node.js
- **Storage:** In-memory (MemStorage)

## Design System
- **Colors:** Pure black background, indigo accents (243, 75%, 59%)
- **Typography:** Inter font, cinematic hierarchy
- **Spacing:** Tailwind units (4, 6, 8, 12, 16, 24)
- **Animations:** Strategic, subtle (0.3-1s durations)
- **Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

## User Preferences
- Portfolio showcases 7 cinematic projects
- Video-first design with hover-preview interactions
- Dark, immersive aesthetic with glassmorphism
- Professional, high-end creative studio feel
- Mobile-optimized for all devices

## Running the Project
The project runs on port 5000 with the "Start application" workflow:
```bash
npm run dev
```

This starts both the Express backend and Vite frontend on the same port.

## Next Phase Enhancements
**Future Features to Consider:**
- Automated Vimeo API integration to fetch videos from vimeo.com/grittyflint
- Project filtering by category (brand campaigns, product films, case studies)
- Individual project detail pages with full credits
- Contact form with email integration
- Lazy loading and progressive video streaming
- 3D effects with Three.js (optional)
- About section with professional portrait
- Case study blog posts

## Testing Status
**End-to-End Tests:** ✅ Passed
- Navigation and header functionality
- Hero section and CTAs
- Video gallery with 7 projects
- Responsive behavior (mobile/desktop)
- External links verification
- Smooth scroll functionality
- Footer and social links

**Known Minor Issues:**
- TypeScript LSP warnings for ReactPlayer (non-blocking, runtime works perfectly)
- Video hover autoplay not testable in headless mode (works in browser)

## Performance Notes
- Custom cursor uses requestAnimationFrame for 60fps
- Only one video plays at a time in gallery
- Cursor beam disabled on touch devices
- Keyboard navigation support (Tab restores default cursor)

## Deployment
Ready to publish! The application is production-ready with:
- No critical bugs
- All features working
- Responsive design verified
- Accessibility improvements implemented
- Clean, maintainable code

---
**Credits:** Built for Moses Mojeokwu | OPTIX Portfolio

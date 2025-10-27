# Hyperreal Cinematographic Portfolio - Design Guidelines

## Design Approach

**Reference-Based Approach**: Draw inspiration from premium creative studios and cinematographers including Awwwards-winning portfolios, Blackmagic Design, RED Digital Cinema showcase sites, and high-end production house portfolios (The Mill, MPC, Frame.io). The aesthetic prioritizes cinematic immersion, technical sophistication, and hyperreal visual fidelity.

**Core Design Principles**:
- Cinematic Storytelling: Every element serves the narrative of craft and precision
- Hyperreal Aesthetics: Blur boundaries between interface and immersive experience  
- Technical Excellence: Showcase both the work and the technical mastery behind it
- Atmospheric Depth: Multi-layered visual treatment creates dimensional space

---

## Typography

**Primary Font**: Inter or SF Pro Display via Google Fonts CDN
- Headlines (H1): 48-64px, font-weight 800, tight tracking (-0.02em)
- Subheadings (H2): 32-40px, font-weight 700, normal tracking
- Section Headers (H3): 24-28px, font-weight 600
- Body: 16-18px, font-weight 400, increased line-height (1.7)
- Metadata/Captions: 12-14px, font-weight 500, uppercase with wide tracking (0.05em)

**Secondary Font**: JetBrains Mono or Roboto Mono for technical details, timestamps, project IDs
- Used sparingly for: video duration overlays, project codes, technical specifications

**Typographic Hierarchy**: Establish clear visual rhythm through scale jumps (1.5x minimum between hierarchy levels), generous whitespace around headlines, and intentional use of font weights to guide attention.

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 24
- Micro spacing (gaps, padding within components): 4, 6
- Component spacing (cards, sections): 8, 12, 16
- Section breaks and major divisions: 24

**Grid System**:
- Container: max-w-7xl with px-6 (mobile), px-12 (desktop)
- Project Grid: 1 column (mobile) → 2 columns (md) → 3 columns (lg)
- Asymmetric layouts for featured work: 2:1 or 3:2 column ratios using CSS Grid

**Vertical Rhythm**: Establish consistent section spacing of py-16 (mobile) and py-24 (desktop) to create breathing room between major content blocks.

---

## Component Library

### Navigation
- Fixed transparent header with backdrop-blur-xl
- Glassmorphism treatment: background opacity 6-10%, border opacity 10%
- Horizontal layout: Logo/name (left), navigation links (center), social icons (right)
- Minimal height (h-20) to maximize viewport for content
- Smooth scroll behavior for anchor navigation

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Two-column layout: Text content (left 40%), Featured video preview (right 60%)
- Headline with staggered fade-in animation (0.3s delay between lines)
- Video player with custom play button overlay (large, semi-transparent circle with glassmorphism)
- CTA buttons with backdrop-blur and subtle border glow on hover
- Background: Multi-layered gradients creating depth (radial from center, subtle vignette)

### Video Gallery Grid
- Masonry-style grid with variable aspect ratios to break monotony
- Each card contains:
  - Video preview container with aspect-video (16:9) default
  - Hover state: auto-play muted video loop, scale transform (1.02), elevated shadow
  - Bottom-left overlay: Project metadata with backdrop-blur capsule
  - Below video: Project title (font-weight 600), brief description, optional tags
- Border treatment: 1px border with 6-10% opacity creating card separation
- Card background: Subtle gradient or transparency (10-20%) over dark base

### Video Player Component
- ReactPlayer integration with custom controls overlay
- Light mode thumbnail: High-quality still frame with semi-transparent play button
- Playing state: Minimal chrome, focus on content
- Optional: Progress bar at bottom, volume control on hover
- Full-screen capability with custom enter/exit animations

### Cursor System
- Custom cursor beam: 96px diameter circle following mouse position
- Radial gradient fill with screen blend mode for ethereal glow effect
- Backdrop-filter blur (6px) creating lens-like distortion
- Hide default cursor (cursor: none on body)
- Smooth following animation using requestAnimationFrame for 60fps performance

### Project Detail Modal/Overlay
- Full-screen takeover with backdrop blur and dark overlay (80% opacity)
- Content container: max-w-5xl centered with padding
- Video player takes 70% height, metadata sidebar 30%
- Include: Project title, client, year, role, technical specs, description
- Close button: Fixed top-right with X icon, hover scale animation
- Background click-to-close functionality

### Footer
- Minimal footprint (py-12) with centered content
- Social links in horizontal row with icon fonts (Font Awesome or Heroicons)
- Contact email as prominent link with subtle hover underline
- Optional: Newsletter signup form with inline input and glassmorphic button
- Copyright notice in reduced opacity (50-60%)

---

## Animations

**Use Sparingly - Strategic Placement Only**:

- **Page Load**: Staggered fade-in for header, hero headline (each line 0.2s delay), and featured video (0.4s after headline)
- **Scroll Animations**: Parallax background gradient shifts at 0.3x scroll speed for depth
- **Hover States**: 
  - Video cards: Scale 1.02 with 0.3s ease-out
  - Buttons: Subtle glow expansion (2px) on border
- **Cursor Beam**: Smooth position following with slight lag (0.1s) for fluid motion
- **Video Transitions**: Fade-in (0.4s) when entering playing state

**No Animations**: Page transitions between sections, text scrolling effects, excessive micro-interactions that distract from content.

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

**Mobile Adaptations**:
- Hero: Stack to single column, video below text
- Navigation: Hamburger menu with slide-in drawer
- Grid: Single column with full-width cards
- Cursor beam: Disabled on touch devices
- Video auto-play: Disabled on mobile (data considerations)
- Typography: Scale down by 20-30% across hierarchy

**Touch Optimizations**:
- Minimum touch target: 44x44px for all interactive elements
- Video cards: Tap-to-play instead of hover preview
- Simplified hover states become active/pressed states

---

## Atmospheric Effects

**Layered Depth**:
- Background layer: Deep gradient (radial ellipse from top center)
- Mid-ground: Subtle noise texture overlay (2-3% opacity) for filmic quality
- Foreground: Content with glassmorphic cards and borders
- Accent layer: Cursor beam and interactive glows

**Glassmorphism Treatment**:
- Background blur: backdrop-filter blur(12-20px)
- Background opacity: 6-15% depending on content hierarchy
- Border: 1px solid with 10-15% opacity
- Shadow: Soft, elevated (0 8px 32px with 20% opacity)

**Vignette Effect**: Radial gradient overlay from edges (0% center to 40% edges) to focus attention and create cinematic letterbox feel.

---

## Content Strategy

**Video Showcases**: 
- Minimum 6 projects, ideal 9-12 for robust portfolio presentation
- Mix of aspect ratios where appropriate (16:9 standard, 21:9 cinematic, 9:16 vertical for social content)
- Each project includes: Title, client/context, role, 2-3 sentence description

**Hero Messaging**:
- Primary headline: Bold statement of craft philosophy (5-8 words)
- Supporting copy: 2-3 sentences on approach and expertise (60-90 words)
- Dual CTAs: "Explore Work" (primary), "Contact" (secondary)

**About Section** (Optional but Recommended):
- Grid layout: Portrait photo (left 40%), bio text (right 60%)
- Include: Background, expertise areas, notable clients, awards/recognition
- Technical proficiencies: Camera systems, software, specializations

---

## Icons & Assets

**Icon Library**: Heroicons (outline style for consistency)
- Navigation: Menu, close, external link icons
- Social: Behance, Vimeo, email icons  
- Video UI: Play, pause, fullscreen, volume controls
- Implementation: Inline SVG with currentColor for easy styling

**Images**:
This portfolio is video-first, images are secondary:
- Hero: Featured video takes precedence (no static hero image)
- About section: Professional portrait (headshot or environmental shot, 600x800px minimum)
- Project thumbnails: Extracted video frames or custom keyframe exports
- All images should maintain cinematic color grading consistent with video work

**No large hero image** - video player serves as primary visual anchor.

---

## Accessibility

- Keyboard navigation: Tab through all interactive elements, Enter to activate
- Video controls accessible via keyboard (play/pause with Space, seek with arrows)
- Focus states: 2px outline with 60% opacity, offset 2px from element
- Alt text for all images, aria-labels for icon buttons
- Skip-to-content link for screen readers
- Minimum contrast ratio 4.5:1 for all text
- Disable cursor beam effects for users with prefers-reduced-motion
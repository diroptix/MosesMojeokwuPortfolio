import { db } from "./db";
import { projects, graphicDesigns, tiktokVideos } from "@shared/schema";
import { tiktokSeedData } from "./seed/tiktok";

export async function seed() {
  console.log("Seeding database...");

  const initialProjects = [
    // Brand Campaigns
    {
      title: "ORS Olive Oil: 3X Scalp Comfort – A Journey to Nourished Confidence",
      description: "From initial spark to final frame, the ORS Olive Oil 3X Scalp Comfort campaign unfolded like a cinematic masterpiece. Each frame was meticulously crafted with dynamic sequences and nuanced color grading. Beyond visuals, the campaign wove storytelling with strategic marketing for deep audience impact.",
      videoUrl: "https://player.vimeo.com/video/1125696312",
      thumbnailUrl: "https://i.vimeocdn.com/video/2067913707-93d23b3ec0b0034707e95f5146c240f65616e4d9d23e692730ee59228f4925f5-d_960x540",
      category: "brand-campaign",
      featured: "true",
      role: "Creative Director",
      year: "2024"
    },
    {
      title: "RUFF N TUMBLE – LISTEN2ME",
      description: "A vibrant campaign combining playful storytelling with engaging visuals. Every shot resonated with both children and parents. The video effectively captured the essence of the brand.",
      videoUrl: "https://player.vimeo.com/video/279264635",
      thumbnailUrl: "https://i.vimeocdn.com/video/833342410-4985933520bfe77609e0bbadfbd65b0b8c7fd38b1f8bc97dad2687cfe9fee6fc-d_960x540",
      category: "brand-campaign",
      featured: "true",
      role: "Creative Director | Director of Photography",
      year: "2023"
    },
    // Commercials
    {
      title: "Shal'Artem - Knockout Malaria in 3 Days",
      description: "As Creative Director and DOP, I captured Brodashaggi's energy and the product's promise through dynamic camera work. Every shot engaged viewers and highlighted Shal'Artem's impact. This project balanced striking visuals with compelling storytelling.",
      videoUrl: "https://player.vimeo.com/video/888822688",
      thumbnailUrl: "https://i.vimeocdn.com/video/1760283135-6aeb3848eb6e9ccf1f427dabf7224bd4592ed64b0283d1b1ea7ffc86a86c0f3a-d_960x540",
      category: "commercial",
      featured: "true",
      role: "Creative Director | Director of Photography",
      year: "2024"
    },
    {
      title: "SPREAD THE ROAR",
      description: "This campaign blended compelling storytelling with dynamic visuals. I captured Brodashaggi's energy and highlighted the product's promise. Every frame was crafted to engage viewers while emphasizing Shal'Artem's impact.",
      videoUrl: "https://player.vimeo.com/video/472914950",
      thumbnailUrl: "https://i.vimeocdn.com/video/983616401-0e679f068919074a5c9092aa107c48ef2dd6afd5c0f92c8c8182a30300caf8c2-d_960x540",
      category: "commercial",
      featured: "true",
      role: "Creative Director | Director of Photography",
      year: "2023"
    },
    // Case Studies
    {
      title: "Greenpeg Thrives in Distribution with Zoho One",
      description: "This case study captured the human essence behind Greenpeg's digital transformation. Interviews and operations were framed with purposeful lighting. Every shot visualized efficiency, growth, and the team's passion.",
      videoUrl: "https://www.youtube.com/embed/jLf_XTSiPqQ",
      thumbnailUrl: "https://i.ytimg.com/an_webp/jLf_XTSiPqQ/mqdefault_6s.webp",
      category: "case-study",
      featured: "true",
      role: "Director of Photography",
      year: "2024"
    },
    {
      title: "Bourn Factor Competition",
      description: "A detailed case study showcasing the competition's impact. From participant stories to event highlights, this piece captures the transformative journey and creative excellence of the Bourn Factor initiative.",
      videoUrl: "https://player.vimeo.com/video/374781283",
      thumbnailUrl: "https://i.vimeocdn.com/video/833341011-d6a10e74939ee0f0f85c40b8b8c2475927bf63b3ce4f7cc3fc188cd03c938f24-d_960x540",
      category: "case-study",
      featured: "true",
      role: "Creative Director | Director of Photography",
      year: "2023"
    }
  ];

  for (const project of initialProjects) {
    await db.insert(projects).values(project);
    console.log(`✓ Created project: ${project.title}`);
  }

  console.log("Database seeded successfully!");

  const initialGraphicDesigns = [
    {
      title: "Craftsmanship Design Layout",
      description: "High-resolution graphic design showcasing artisan craftsmanship with modern aesthetic",
      imageUrl: "https://drive.google.com/uc?export=view&id=1K_kfEB5My5wqD2OVFYMfXnwbLg3yE0Tq",
      thumbnailUrl: "https://drive.google.com/uc?export=view&id=1K_kfEB5My5wqD2OVFYMfXnwbLg3yE0Tq",
      category: "graphic-design",
      client: "Heritage Foundation",
      year: "2024",
      width: "2700",
      height: "4050"
    },
    {
      title: "Ethereal Soundscapes Design",
      description: "Abstract visual composition for music branding with vibrant color palette",
      imageUrl: "https://drive.google.com/uc?export=view&id=1G-A2rP-JLgab3DWLt8QX0G12V07RHpPQ",
      thumbnailUrl: "https://drive.google.com/uc?export=view&id=1G-A2rP-JLgab3DWLt8QX0G12V07RHpPQ",
      category: "graphic-design",
      client: "Independent Artist",
      year: "2024",
      width: "2700",
      height: "4050"
    }
  ];

  for (const design of initialGraphicDesigns) {
    await db.insert(graphicDesigns).values(design);
    console.log(`✓ Created graphic design: ${design.title}`);
  }

  for (const tiktok of tiktokSeedData) {
    await db.insert(tiktokVideos).values(tiktok);
    console.log(`✓ Created TikTok video: ${tiktok.title}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
}

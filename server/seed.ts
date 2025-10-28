import { db } from "./db";
import { projects } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const initialProjects = [
    {
      title: "Brand Campaign: Urban Odyssey",
      description: "A cinematic exploration of metropolitan landscapes, blending architectural precision with human narrative. Shot on RED Komodo 6K.",
      videoUrl: "https://drive.google.com/uc?export=preview&id=1iJph3-h5_Tl7f58pLHM5T5Pyc9Djel3q",
      category: "brand-campaign",
      client: "Urban Collective",
      role: "Director of Photography",
      year: "2024",
      credits: "DP: Moses Mojeokwu\nCamera: RED Komodo 6K\nClient: Urban Collective"
    },
    {
      title: "Product Film: Precision Timepiece",
      description: "Hyperreal macro cinematography showcasing mechanical artistry. Technical showcase of light manipulation and shallow depth techniques.",
      videoUrl: "https://drive.google.com/uc?export=preview&id=1GThhTv-4JvSE9pnl5qSHWZ9cq7LbFVnl",
      category: "product-film",
      client: "Timekeeper Studios",
      role: "Cinematographer",
      year: "2024",
      credits: "Cinematographer: Moses Mojeokwu\nClient: Timekeeper Studios\nProduction: In-house"
    },
    {
      title: "Fashion Editorial: Monochrome Dreams",
      description: "High-contrast visual narrative merging fashion and fine art. Experimental lighting setups creating sculptural depth.",
      videoUrl: "https://drive.google.com/uc?export=preview&id=15rmwwP0kmqPHN7O7FUIYS6ErY-8cHZjZ",
      category: "case-study",
      client: "Mode Magazine",
      role: "Creative Director",
      year: "2023",
      credits: "Creative Director: Moses Mojeokwu\nClient: Mode Magazine\nStyling: Fashion Forward Team"
    },
    {
      title: "Documentary Short: Craftsmanship",
      description: "Intimate portrait of artisan workshops, capturing the intersection of tradition and innovation through cinematic lens work.",
      videoUrl: "https://drive.google.com/uc?export=preview&id=1K_kfEB5My5wqD2OVFYMfXnwbLg3yE0Tq",
      category: "case-study",
      client: "Heritage Foundation",
      role: "Director of Photography",
      year: "2023",
      credits: "DP: Moses Mojeokwu\nDirector: Heritage Foundation\nProducer: Documentary Collective"
    },
    {
      title: "Music Video: Ethereal Soundscapes",
      description: "Abstract visual composition synchronized with electronic music. Pushed boundaries of color grading and motion dynamics.",
      videoUrl: "https://drive.google.com/uc?export=preview&id=1G-A2rP-JLgab3DWLt8QX0G12V07RHpPQ",
      category: "brand-campaign",
      client: "Independent Artist",
      role: "Visual Designer",
      year: "2024",
      credits: "Visual Designer: Moses Mojeokwu\nArtist: Independent Musician\nGrading: OPTIX Studios"
    },
    {
      title: "Corporate Story: Innovation Lab",
      description: "Brand film showcasing technological advancement through human-centered storytelling and dynamic camera movement.",
      videoUrl: "https://vimeo.com/76979871",
      category: "brand-campaign",
      client: "TechForward Inc",
      role: "Cinematographer",
      year: "2023",
      vimeoId: "76979871",
      credits: "Cinematographer: Moses Mojeokwu\nClient: TechForward Inc\nProduction Company: OPTIX"
    },
    {
      title: "Commercial: Automotive Elegance",
      description: "Luxury vehicle showcase emphasizing design language through strategic lighting and precise camera choreography.",
      videoUrl: "https://vimeo.com/148751763",
      category: "product-film",
      client: "Premium Motors",
      role: "Director of Photography",
      year: "2024",
      vimeoId: "148751763",
      credits: "DP: Moses Mojeokwu\nClient: Premium Motors\nAgency: Creative Collective"
    }
  ];

  for (const project of initialProjects) {
    await db.insert(projects).values(project);
    console.log(`✓ Created project: ${project.title}`);
  }

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Multi-Story Residential Complex - Phase 1",
    slug: "residential-1",
    thumbnail: "/assets/thumbnails/residential/1.png",
    description: "Multi-unit residential project in initial construction phase",
    category: "Residential",
    images: [
      "/assets/thumbnails/residential/1.png",
      "/assets/thumbnails/residential/2.png",
      "/assets/thumbnails/residential/3.png",
      "/assets/thumbnails/residential/4.png",
    ],
  },
  {
    title: "Commercial Office Building",
    slug: "commercial-1",
    thumbnail: "/assets/thumbnails/commercial/1.png",
    description: "Corporate office space design and development",
    category: "Commercial",
    images: [
      "/assets/thumbnails/commercial/1.png",
      "/assets/thumbnails/commercial/2.jpeg",
    ],
  },
  {
    title: "Building Elevation Design",
    slug: "elevation-1",
    thumbnail: "/assets/thumbnails/elevation/1.png",
    description: "Detailed architectural elevation and facade design",
    category: "Elevation",
    images: [
      "/assets/thumbnails/elevation/1.png",
      "/assets/thumbnails/elevation/2.png",
      "/assets/thumbnails/elevation/3.png",
    ],
  },
  {
    title: "Construction Site Layout",
    slug: "construction-1",
    thumbnail: "/assets/thumbnails/construction/1.png",
    description: "Site planning, layout, and construction management",
    category: "Construction",
    images: [
      "/assets/thumbnails/construction/1.png",
      "/assets/thumbnails/construction/2.png",
      "/assets/thumbnails/construction/3.png",
      "/assets/thumbnails/construction/4.png",
      "/assets/thumbnails/construction/5.png",
    ],
  },
  {
    title: "Structural Framework Analysis",
    slug: "structural-1",
    thumbnail: "/assets/thumbnails/structural/1.png",
    description: "Structural design, analysis, and reinforcement planning",
    category: "Structural",
    images: [
      "/assets/thumbnails/structural/1.png",
      "/assets/thumbnails/structural/2.png",
      "/assets/thumbnails/structural/3.png",
      "/assets/thumbnails/structural/4.png",
    ],
  },
  {
    title: "Architectural Design Showcase",
    slug: "architecture-1",
    thumbnail: "/assets/thumbnails/architecture/1.png",
    description: "Modern architectural designs and spatial planning",
    category: "Architecture",
    images: [
      "/assets/thumbnails/architecture/1.png",
      "/assets/thumbnails/architecture/2.png",
      "/assets/thumbnails/architecture/3.png",
      "/assets/thumbnails/architecture/4.png",
      "/assets/thumbnails/architecture/5.png",
      "/assets/thumbnails/architecture/6.png",
    ],
  },
  {
    title: "3D Design Renderings",
    slug: "3d-designs-1",
    thumbnail: "/assets/thumbnails/3d-designs/1.png",
    description: "Advanced 3D modeling and rendering visualizations",
    category: "3D Designs",
    images: [
      "/assets/thumbnails/3d-designs/1.png",
      "/assets/thumbnails/3d-designs/2.jpeg",
    ],
  },
] as const satisfies ProjectPreview[];

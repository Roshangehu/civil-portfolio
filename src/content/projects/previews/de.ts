import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Mehrgeschossiger Wohnkomplex - Phase 1",
    slug: "residential-1",
    thumbnail: "/assets/thumbnails/residential/1.png",
    description: "Mehreinheiten-Wohnprojekt in der ersten Konstruktionsphase",
    category: "Residential",
    images: [
      "/assets/thumbnails/residential/1.png",
      "/assets/thumbnails/residential/2.png",
      "/assets/thumbnails/residential/3.png",
      "/assets/thumbnails/residential/4.png",
    ],
  },
  {
    title: "Gewerbliches Bürogebäude",
    slug: "commercial-1",
    thumbnail: "/assets/thumbnails/commercial/1.png",
    description: "Büroraumgestaltung und Entwicklung",
    category: "Commercial",
    images: [
      "/assets/thumbnails/commercial/1.png",
      "/assets/thumbnails/commercial/2.jpeg",
    ],
  },
  {
    title: "Gebäudeelevationsdesign",
    slug: "elevation-1",
    thumbnail: "/assets/thumbnails/elevation/1.png",
    description: "Detaillierte architektonische Elevation und Fassadendesign",
    category: "Elevation",
    images: [
      "/assets/thumbnails/elevation/1.png",
      "/assets/thumbnails/elevation/2.png",
      "/assets/thumbnails/elevation/3.png",
    ],
  },
  {
    title: "Bauplatz-Layout",
    slug: "construction-1",
    thumbnail: "/assets/thumbnails/construction/1.png",
    description: "Bauplatzplanung, Layout und Baudurchführung",
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
    title: "Strukturelles Gerüst Analyse",
    slug: "structural-1",
    thumbnail: "/assets/thumbnails/structural/1.png",
    description: "Strukturentwurf, Analyse und Bewehrungsplanung",
    category: "Structural",
    images: [
      "/assets/thumbnails/structural/1.png",
      "/assets/thumbnails/structural/2.png",
      "/assets/thumbnails/structural/3.png",
      "/assets/thumbnails/structural/4.png",
    ],
  },
  {
    title: "Architektur-Designpräsentation",
    slug: "architecture-1",
    thumbnail: "/assets/thumbnails/architecture/1.png",
    description: "Modernes Architekturdesign und Raumplanung",
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
    title: "3D-Design-Renderings",
    slug: "3d-designs-1",
    thumbnail: "/assets/thumbnails/3d-designs/1.png",
    description: "Erweiterte 3D-Modellierung und Rendervisualisierungen",
    category: "3D Designs",
    images: [
      "/assets/thumbnails/3d-designs/1.png",
      "/assets/thumbnails/3d-designs/2.jpeg",
    ],
  },
] as const satisfies ProjectPreview[];

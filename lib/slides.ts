// Slide titles — used by /stats for per-slide analytics labels.
// The actual slide UI lives in components/DeckSlides.tsx.
export interface Slide {
  title: string;
}

export const slides: Slide[] = [
  "Title",
  "Problem",
  "Why now",
  "Product",
  "Structure",
  "Relationship",
  "Traction",
  "Revenue model",
  "Market",
  "Go-to-market",
  "Open network + token",
  "Team",
  "Timeline",
  "Revenue projections",
  "The Ask",
  "Vision",
].map((title) => ({ title }));

export const DECK_TITLE = "OpenPaw — Seed Deck 2026";
export const TOTAL_SLIDES = slides.length;

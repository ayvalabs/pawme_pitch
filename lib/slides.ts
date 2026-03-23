export interface Slide {
  id: number;
  title: string;
  content: string;
  visual: "attached" | "prompt" | "none";
  visualId?: string;
  visualPrompt?: string;
  narration: string;
  recommendedSeconds: number;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "PawMe",
    content: "Your Pet's Smart AI Robot Companion\n\nMonitors Health • Reduces Anxiety • Cuts Vet Costs",
    visual: "none",
    narration: "Hi, I'm Ashok. PawMe is the robot that turns every pet into a happy, healthy family member — even when you're not home.",
    recommendedSeconds: 15,
  },
  {
    id: 2,
    title: "The Problem",
    content: "Pets Are Left Alone… And It's Costing Us All\n• 1.3B pets by 2030\n• 70% separation anxiety\n• $30B+ preventable vet bills",
    visual: "none",
    narration: "You love your pet. But work, travel, and life leave them anxious and unseen.",
    recommendedSeconds: 25,
  },
  {
    id: 3,
    title: "The Solution",
    content: "Meet PawMe — Your Pet's 24/7 AI Companion",
    visual: "none",
    narration: "PawMe isn't a toy. It's a real companion that lives with your pet.",
    recommendedSeconds: 20,
  },
  {
    id: 4,
    title: "Front View",
    content: "Expressive AI Eyes + Camera Brain",
    visual: "none",
    narration: "Pixel eyes show emotions. Built-in camera sees everything.",
    recommendedSeconds: 15,
  },
  {
    id: 5,
    title: "Mobility & Design",
    content: "Smooth, Safe, Pet-Proof Movement\n• 360° wheels\n• Auto-docking",
    visual: "none",
    narration: "Built from real 3D-printed prototypes — already tested with pets.",
    recommendedSeconds: 20,
  },
  {
    id: 6,
    title: "Docking Station",
    content: "Always Charged, Always Ready",
    visual: "none",
    narration: "PawMe returns home automatically.",
    recommendedSeconds: 15,
  },
  {
    id: 7,
    title: "Market Opportunity",
    content: "$68 Billion Pet Tech Market by 2030\n1.3 Billion Pets",
    visual: "none",
    narration: "Huge, growing, and desperate for exactly what we built.",
    recommendedSeconds: 25,
  },
  {
    id: 8,
    title: "Traction",
    content: "From Idea to Working Prototype\n• Functional units built\n• Size-tested with real pets",
    visual: "none",
    narration: "We didn't just design it — we built it.",
    recommendedSeconds: 20,
  },
  {
    id: 9,
    title: "How It Works",
    content: "1. Follows & plays\n2. AI health monitoring\n3. Instant app alerts",
    visual: "none",
    narration: "Pet stays happy. You stay informed.",
    recommendedSeconds: 25,
  },
  {
    id: 10,
    title: "Business Model",
    content: "Hardware + Recurring Revenue\n• $299–399 unit\n• $9.99/mo AI subscription",
    visual: "none",
    narration: "One-time sale + lifetime subscription = scalable revenue.",
    recommendedSeconds: 20,
  },
  {
    id: 11,
    title: "The Ask",
    content: "Seeking $750K Seed\nTo scale production & launch",
    visual: "none",
    narration: "With this round we go from prototype to first 1,000 happy pets.",
    recommendedSeconds: 25,
  },
  {
    id: 12,
    title: "Thank You",
    content: "Let's Give Every Pet a Best Friend\nashok@pawme.ai",
    visual: "none",
    narration: "Thank you. Questions?",
    recommendedSeconds: 10,
  },
];

export const DECK_TITLE = "PawMe - Seed Funding Deck 2026";
export const TOTAL_SLIDES = slides.length;

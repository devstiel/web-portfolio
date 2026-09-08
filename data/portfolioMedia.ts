/** Original embedded images from Creative Portfolio.pdf, supplied before Sampoerna. */
export interface PortfolioImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const november: PortfolioImage = {
  src: "/work/pln-report-november.webp",
  width: 1307,
  height: 742,
  alt: "PLN Bekasi EV charging report with a location map and monthly transaction, energy, and revenue charts.",
  caption:
    "November 2025 reporting snapshot. Its 32,126 transactions reflect an earlier reporting cut-off than the December figures above.",
};
const december: PortfolioImage = {
  src: "/work/pln-report-december.webp",
  width: 890,
  height: 1536,
  alt: "December PLN EV charging infographic showing 39,349 transactions across 27 units at 12 locations.",
  caption:
    "December 2025 reporting snapshot: the 39,349-transaction scope described in this overview.",
};
const environment: PortfolioImage = {
  src: "/work/its-environment-day.webp",
  width: 297,
  height: 371,
  alt: "Illustrated ITS World Environment Day greeting with a character surrounded by greenery.",
  caption: "World Environment Day greeting, June 2024.",
};
const aids: PortfolioImage = {
  src: "/work/its-world-aids-day.webp",
  width: 297,
  height: 370,
  alt: "ITS World AIDS Day greeting featuring two illustrated characters beneath a purple sky.",
  caption: "World AIDS Day greeting, December 2024.",
};
const music: PortfolioImage = {
  src: "/work/its-music-concert.webp",
  width: 496,
  height: 619,
  alt: "Hand-drawn band performing under stage lights for the ITS Music Concert.",
  caption: "ITS Music Concert illustration.",
};

export const projectMedia: Record<
  string,
  { cover: PortfolioImage[]; gallery: PortfolioImage[]; introduction: string }
> = {
  "pln-business-analysis": {
    cover: [november],
    gallery: [november, december],
    introduction:
      "Selected report visuals from my earlier portfolio. Each image keeps its original reporting period; the numbers describe the network being analysed.",
  },
  "its-social-media": {
    cover: [environment, music, aids],
    gallery: [
      environment,
      music,
      aids,
      {
        src: "/work/its-packing.webp",
        width: 295,
        height: 369,
        alt: "Illustrated ITS travel post showing a student with overflowing luggage.",
        caption: "A student-life illustration about packing for a trip.",
      },
      {
        src: "/work/its-team.webp",
        width: 1239,
        height: 826,
        alt: "Members of the ITS social media team posing together in matching team shirts.",
        caption: "The ITS social media team, as featured in my portfolio.",
      },
    ],
    introduction:
      "Illustration and team photographs from my creative portfolio. The selection spans my broader ITS work, including illustrations from 2024 before the lead role began.",
  },
};

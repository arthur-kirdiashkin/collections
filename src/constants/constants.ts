import figma from "../assets/figma.png";
import gitHub from "../assets/github.png";
import telegram from "../assets/telegram.png";
import tic from "../assets/tic.png";
import youtube from "../assets/youtube.png";
import type { CollectionFilters } from "../types/collections.types";

interface Access {
  id: number;
  title: string;
  isFree: boolean;
}

export const ACCESS_OPTIONS: Access[] = [
  { id: 0, title: "Для участников", isFree: false },
  { id: 1, title: "Для всех", isFree: true },
];

// export const INITIAL_FILTERS = {
//   spec: 11,
//   skills: [],
//   levels: [],
//   rates: [],
//   search: "",
// };

// export const INITIAL_COLLECTION_FILTERS: CollectionFilters = {
//   search: "",
//   specializations: [],
//   isFree: undefined,
//   keywords: [],
// };

export const LIMIT = 10;

export interface PreparationLink {
  label: string;
  href: string;
}

export const PREPARATION_LINKS: PreparationLink[] = [
  { label: "База вопросов", href: "#!" },
  { label: "Тренажер", href: "#!" },
  { label: "Материалы", href: "#!" },
  { label: "Навыки (hh)", href: "#!" },
];

export interface Social {
  id: string;
  icon: string;
  alt: string;
}

export const SOCIALS: Social[] = [
  { id: "figma", icon: figma, alt: "Figma" },
  { id: "github", icon: gitHub, alt: "GitHub" },
  { id: "telegram", icon: telegram, alt: "Telegram" },
  { id: "tiktok", icon: tic, alt: "TikTok" },
  { id: "youtube", icon: youtube, alt: "YouTube" },
];

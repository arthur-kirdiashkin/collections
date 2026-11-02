export interface Collection {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  isFree: boolean;
  specializations: Specialization[];
  questionsCount: number;
  keywords: string[];
  company?: Company;
  createdBy: Author;
}

export interface Author {
  id: string;
  username: string;
}

export interface Company {
  id?: string;
  title?: string;
  imageSrc?: string;
}

export interface Specialization {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
}
export interface Question {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  shortAnswer: string;
  longAnswer: string;
  imageSrc: string;
  rate: number;
  complexity: number;
  questionSkills: QuestionSkills[];
  createdBy?: Author;
}

export interface QuestionSkills {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

export interface CollectionFilters {
  search?: string;
  specialization?: number;
  isFree?: boolean | null;
  keywords?: string[];
}

export interface CollectionsParams {
  page: number;
  limit: number;
  filters: CollectionFilters;
  signal?: AbortSignal;
}

export interface QuestionsParams {
  page: number;
  collection: number;
  signal?: AbortSignal;
}

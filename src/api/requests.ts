import axios from "axios";
import { BASE_URL } from "../constants/api";
import type {
  CollectionsParams,
  QuestionsParams,
} from "../types/collections.types";

export const getCollections = async ({
  page,
  limit,
  filters,
  signal,
}: CollectionsParams) => {
  const {
    specialization = undefined,
    keywords = [],
    search = "",
    isFree = undefined,
  } = filters;

  const response = await axios.get(`${BASE_URL}/collections/public`, {
    signal,
    params: {
      page,
      limit,
      isFree,
      specializations:
        specialization !== undefined ? specialization : undefined,
      keywords: keywords.length ? keywords : undefined,
      titleOrDescriptionSearch: search.trim() || undefined,
    },
  });

  return response.data;
};

export const getSpecializations = async () => {
  const response = await axios.get(`${BASE_URL}/specializations`);

  const total = response.data.total || 0;
  const data = response.data.data || [];

  if (total <= data.length) {
    return response.data;
  }

  const fullResponse = await axios.get(`${BASE_URL}/specializations`, {
    params: { limit: total },
  });

  return fullResponse.data;
};

export const getCollection = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/collections/${id}/public`);

  return response.data;
};

export const getQuestions = async ({
  page,
  collection,
  signal,
}: QuestionsParams) => {
  const response = await axios.get(`${BASE_URL}/questions/public-questions`, {
    signal,
    params: {
      page,
      collection,
    },
  });

  return response.data;
};

export const getQuestion = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/questions/public-questions/${id}`,
  );

  return response.data;
};

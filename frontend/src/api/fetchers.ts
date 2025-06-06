import { axiosInstance } from "../config/axiosInstance";
import type { NewsArticle } from "../types/news";
import type { AxiosResponse } from "axios";

export const fetchNews = async ({
  query,
}: {
  query: string;
}): Promise<NewsArticle[]> => {
  try {
    const response: AxiosResponse<{ articles: NewsArticle[] }> =
      await axiosInstance.get(`?q=${query}`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

const LIMIT = 6;

export interface FetchItemsResponse {
  data: NewsArticle[];
  currentPage: number;
  nextPage: number | undefined;
}

export async function fetchItems({
  pageParam = 1,
  query = "news",
}: {
  pageParam?: number;
  query?: string;
}): Promise<FetchItemsResponse> {
  try {
    const response = await axiosInstance.get("", {
      params: {
        q: query,
        page: pageParam,
        pageSize: LIMIT,
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
      },
    });

    return {
      data: response.data.articles || [],
      currentPage: pageParam,
      nextPage:
        response.data.articles?.length === LIMIT ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      data: [],
      currentPage: pageParam,
      nextPage: undefined,
    };
  }
}

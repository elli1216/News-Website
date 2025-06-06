import { create } from 'zustand';
import type { NewsArticle } from '../types/news';

interface NewsStore {
  news: NewsArticle[];
  setNews: (news: NewsArticle[]) => void;
  clearNews: () => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  news: [],
  setNews: (news) => set({ news }),
  clearNews: () => set({ news: [] })
}));

// Selector for getting news
const selectNews = (state: NewsStore) => state.news;
const selectSetNews = (state: NewsStore) => state.setNews;

export const useNews = () => useNewsStore(selectNews);
export const useSetNews = () => useNewsStore(selectSetNews);

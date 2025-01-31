import { useState } from "react";
import { News } from "../types";
import { useCrud } from "./useCrud";
import { useFetch } from "./useFetch";

export function useNews() {
  const { data: initialNews, fetchData, fetchById, setData, loading, error } = useFetch<News>('news');
  const { create, update, remove } = useCrud<News>('news');

  const [news, setNews] = useState<News[]>(initialNews);

  const getNews = async () => {
    const fetchedNews = await fetchData();
    console.log("fetchedNews", fetchedNews);
    return fetchedNews; // ✅ Ahora asignamos el resultado correctamente
  };

  const createNews = async (news: Partial<News>) => {
    await create(news);
  };

  const updateNews = async (id: string, news: Partial<News>) => {
    await update(id, news);
  };

  const deleteNews = async (id: string) => {
    await remove(id);
  };

  return {
    news,
    getNews,
    createNews,
    updateNews,
    deleteNews,
    fetchNewsById: fetchById,
    loading,
    error,
  };
}

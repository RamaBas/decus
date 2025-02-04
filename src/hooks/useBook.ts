import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Book } from '../types';

export function useBooks() {
  const { fetchData, loading: fetchLoading, error: fetchError } =
    useFetch<Book>('books');

  const { create, update, remove, loading, error } = useCrud<Book>('books');

  const getBooks = async () => {
    const fetchedNews = await fetchData();
    return fetchedNews; // ✅ Ahora asignamos el resultado correctamente
  };

  const createBook = async (book: Partial<Book>) => {
    await create(book);
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    console.log("book", book);
    await update(id, book);
  };

  const deleteBook = async (id: string) => {
    await remove(id);
  };

  return {
    getBooks,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

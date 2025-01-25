import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Book } from '../types';

export function useBooks() {
  const { data, loading: fetchLoading, error: fetchError, refetch } =
    useFetch<Book>('books');

  const { create, update, remove, loading, error } = useCrud<Book>('books');

  const createBook = async (book: Partial<Book>) => {
    await create(book);
    refetch();
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    console.log("book", book);
    await update(id, book);
    refetch();
  };

  const deleteBook = async (id: string) => {
    await remove(id);
    refetch();
  };

  return {
    books: data,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

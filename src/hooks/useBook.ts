import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Book } from '../types';

export function useBooks() {
  const { create, update, remove, loading, error } = useCrud<Book>('books');
  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<Book>('books');

  return {
    books: data,
    createBook: create,
    updateBook: update,
    deleteBook: remove,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

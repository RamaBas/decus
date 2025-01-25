import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Academic } from '../types';

export function useAcademics() {
  const { create, update, remove, loading, error } =
    useCrud<Academic>('academics');
  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<Academic>('academics');

  return {
    academics: data,
    createAcademic: create,
    updateAcademic: update,
    deleteAcademic: remove,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

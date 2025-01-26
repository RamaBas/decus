import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Academic } from '../types';

export function useAcademics() {
  const { data, loading: fetchLoading, error: fetchError, refetch } =
  useFetch<Academic>('academics');

  const { create, update, remove, loading, error } = useCrud<Academic>('academics');

  const createAcademic = async (academic: Partial<Academic>) => {
    await create(academic);
    refetch();
  };

  const updateAcademic = async (id: string, academic: Partial<Academic>) => {
    await update(id, academic);
    refetch();
  };

  const deleteAcademic = async (id: string) => {
    await remove(id);
    refetch();
  };


  return {
    academics: data,
    createAcademic: createAcademic,
    updateAcademic: updateAcademic,
    deleteAcademic: deleteAcademic,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

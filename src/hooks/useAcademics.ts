import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Academic } from '../types';

export function useAcademics() {
  const { loading: fetchLoading, error: fetchError, refetch, fetchData } =
  useFetch<Academic>('academics');

  const { create, update, remove, loading, error } = useCrud<Academic>('academics');

  const getAcademics = async () => {
    const fetchedAcademics = await fetchData();
    return fetchedAcademics; // ✅ Ahora asignamos el resultado correctamente
  };

  const createAcademic = async (academic: Partial<Academic>) => {
    await create(academic);
  };

  const updateAcademic = async (id: string, academic: Partial<Academic>) => {
    await update(id, academic);
  };

  const deleteAcademic = async (id: string) => {
    await remove(id);
  };


  return {
    getAcademics: getAcademics,
    createAcademic: createAcademic,
    updateAcademic: updateAcademic,
    deleteAcademic: deleteAcademic,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

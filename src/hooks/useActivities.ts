import { Activity } from "../types";
import { useCrud } from "./useCrud";
import { useFetch } from "./useFetch";

export function useActivities() {
  const { fetchData, loading: fetchLoading, error: fetchError, refetch } =
    useFetch<Activity>('activities');

  const { create, update, remove, loading, error } = useCrud<Activity>('activities');

  const getActivities = async () => {
    const fetchedActivities = await fetchData();
    return fetchedActivities; // ✅ Ahora asignamos el resultado correctamente
  };

  const createActivity = async (activity: Partial<Activity>) => {
    await create(activity);
  };

  const updateActivity = async (id: string, activity: Partial<Activity>) => {
    await update(id, activity);
  };

  const deleteActivity = async (id: string) => {
    await remove(id);
  };

  return {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

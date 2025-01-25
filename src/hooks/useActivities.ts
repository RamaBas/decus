import { Activity } from "../types";
import { useCrud } from "./useCrud";
import { useFetch } from "./useFetch";

export function useActivities() {
  const { data, loading: fetchLoading, error: fetchError, refetch } =
    useFetch<Activity>('activities');

  const { create, update, remove, loading, error } = useCrud<Activity>('activities');

  const createActivity = async (activity: Partial<Activity>) => {
    await create(activity);
    console.log("Creando actividad...");
    refetch();
  };

  const updateActivity = async (id: string, activity: Partial<Activity>) => {
    await update(id, activity);
    refetch();
  };

  const deleteActivity = async (id: string) => {
    await remove(id);
    refetch();
  };

  return {
    activities: data,
    createActivity,
    updateActivity,
    deleteActivity,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

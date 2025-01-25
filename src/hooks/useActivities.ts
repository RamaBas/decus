import { useCrud } from './useCrud';
import { useFetch } from './useFetch';
import { Activity } from '../types';

export function useActivities() {
  const { create, update, remove, loading, error } =
    useCrud<Activity>('activities');
  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch<Activity>('activities');

  return {
    activities: data,
    createActivity: create,
    updateActivity: update,
    deleteActivity: remove,
    loading: loading || fetchLoading,
    error: error || fetchError,
  };
}

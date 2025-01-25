import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useCrud<T>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from(tableName).insert([data]);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
}

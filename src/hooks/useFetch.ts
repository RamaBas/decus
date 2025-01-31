import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useFetch<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<T[]> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un elemento por ID
  const fetchById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single(); // Usamos .single() porque esperamos un solo resultado
      if (error) throw error;
      return data as T;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData, fetchById, fetchData };
}

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useFetch<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error;
      setData(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  return { data, loading, error, refetch: fetchData };
}

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export function useSupabaseQuery<T>(
  tableName: string,
  options: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase
          .from(tableName)
          .select(options.select || '*');

        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true
          });
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (error) {
          throw error;
        }

        setData(result as T[]);
      } catch (err) {
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, options.select, options.orderBy?.column, options.orderBy?.ascending, options.limit]);

  return { data, error, loading, refetch: () => setLoading(true) };
}
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useCrud<T>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJwtToken = () => {
    // Obtener el JWT desde sessionStorage
    return sessionStorage.getItem('jwt_token');
  };

  // Establecer el token JWT para cada consulta a Supabase
  const setSupabaseAuth = () => {
    const token = getJwtToken();
    if (token) {
      const session = { access_token: token, refresh_token: '' }; // Asumiendo que tienes el refresh_token
      supabase.auth.setSession(session);
    }
  };

  const create = async (data: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      setSupabaseAuth(); // Configurar el token de autenticación
      const { id, ...dataWithoutId } = data;
      const { error } = await supabase.from(tableName).insert([dataWithoutId]);
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
      setSupabaseAuth(); // Configurar el token de autenticación
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
      setSupabaseAuth(); // Configurar el token de autenticación
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

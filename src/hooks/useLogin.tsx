import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Asegúrate de tener la instancia de Supabase importada

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Guardamos el JWT token en sessionStorage
      if (data?.session?.access_token) {
        sessionStorage.setItem('jwt_token', data.session.access_token);
      }
      return true
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

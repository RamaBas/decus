import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AdminStats } from '../types';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: academicsCount },
          { count: booksCount },
          { count: activitiesCount },
          { count: publicationsCount },
          { count: newsCount },
          { data: recentActivities },
          { data: recentPublications },
          { data: recentNews }
        ] = await Promise.all([
          supabase.from('academics').select('*', { count: 'exact', head: true }),
          supabase.from('books').select('*', { count: 'exact', head: true }),
          supabase.from('activities').select('*', { count: 'exact', head: true }),
          supabase.from('publications').select('*', { count: 'exact', head: true }),
          supabase.from('news').select('*', { count: 'exact', head: true }),
          supabase.from('activities').select('*').order('date', { ascending: false }).limit(5),
          supabase.from('publications').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('news').select('*').order('date', { ascending: false }).limit(5)
        ]);

        setStats({
          totalAcademics: academicsCount || 0,
          totalBooks: booksCount || 0,
          totalActivities: activitiesCount || 0,
          totalPublications: publicationsCount || 0,
          totalNews: newsCount || 0,
          recentActivities: recentActivities || [],
          recentPublications: recentPublications || [],
          recentNews: recentNews || []
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
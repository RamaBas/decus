import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useNews } from '../../hooks/useNews';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
  const { fetchNewsById } = useNews();
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNewsItem = async () => {
      try {
        const item = await fetchNewsById(id || '');
        if (item) {
          setNewsItem(item);
        } else {
          setError('Novedad no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la novedad');
      } finally {
        setLoading(false);
      }
    };

    loadNewsItem();
  }, []);

  if (loading) return <div>Cargando novedad...</div>;
  if (error) return <div>{error}</div>;
  if (!newsItem) return <div>Novedad no encontrada</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <img
        src={newsItem.image || 'https://via.placeholder.com/800x400'} // Imagen de la noticia
        alt={newsItem.title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-5 w-5 mr-2" />
          {new Date(newsItem.date).toLocaleDateString('es-AR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          {newsItem.title}
        </h1>
        <div className="mt-6 prose max-w-none text-gray-600">
          {newsItem.content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
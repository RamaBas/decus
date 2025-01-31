import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../hooks/useNews';
import { NewsDTO } from '../../types';

const News: React.FC = () => {
  const { getNews, loading, error } = useNews();
  const [news, setNews] = useState<NewsDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNews = await getNews(); // Esperamos la respuesta
      console.log("fetchedNews", fetchedNews);
      setNews(fetchedNews);
    };
    fetchData();
  }, []); // Asegurar que el efecto se ejecuta correctamente

  // Función para recortar el contenido a un máximo de caracteres
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  if (loading) return <div>Cargando novedades...</div>;
  if (error) return <div>Error al cargar las novedades: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Novedades</h1>
        <p className="mt-4 text-xl text-gray-500">
          Manténgase actualizado con las últimas noticias y eventos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image || 'https://via.placeholder.com/300'}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-5 w-5 mr-2" />
                {item.date}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {item.title}
              </h2>
              <div className="mt-4 text-gray-600">
                {truncateContent(item.content, 100)}
              </div>
              <button
                onClick={() => navigate(`/news/${item.id}`)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Ver más
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;

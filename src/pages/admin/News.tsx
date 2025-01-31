import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Pencil, Trash2, Search, Calendar } from 'lucide-react';
import type { News } from '../../types';
import { useNews } from '../../hooks/useNews';
import { NewsModal } from '../../components/Modals/NewsModal';

const AdminNews: React.FC = () => {
  const { news, createNews, updateNews, deleteNews } = useNews();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    setUpdateState((prev) => !prev); // Forzar actualización tras cambios
  }, [news]);

  const filteredNews = useMemo(() => {
    return news.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [news, searchTerm]);

  // Manejar la creación/edición de noticia
  const handleSave = async (newsItem: News) => {
    if (selectedNews) {
      await updateNews(selectedNews.id, newsItem);
    } else {
      await createNews(newsItem);
    }
    setShowModal(false);
  };

  // Manejar la eliminación de noticia
  const handleDelete = async (newsId: string) => {
    await deleteNews(newsId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Novedades</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            setSelectedNews(null);
            setShowModal(true);
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Novedad
        </button>
      </div>

      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar novedades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredNews.map((item) => (
            <li key={item.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">{item.title}</p>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{item.content}</p>
                <p className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="mr-1.5 h-5 w-5 text-gray-400" />
                  {new Date(item.date).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    setSelectedNews(item);
                    setShowModal(true);
                  }}
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <NewsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          news={selectedNews}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminNews;

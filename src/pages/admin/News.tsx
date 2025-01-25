import React from 'react';
import { PlusCircle, Pencil, Trash2, Search, Calendar } from 'lucide-react';
import type { News } from '../../types';

const AdminNews: React.FC = () => {
  const [news, setNews] = React.useState<News[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredNews = React.useMemo(() => {
    return news.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [news, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Novedades</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Novedad
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar novedades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* News List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredNews.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {item.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {new Date(item.date).toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {/* Handle edit */}}
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {/* Handle delete */}}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminNews;
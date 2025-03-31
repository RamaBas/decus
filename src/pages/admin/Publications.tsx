import React from 'react';
import { PlusCircle, Pencil, Trash2, Search, Filter, BookOpen } from 'lucide-react';
import type { Publication } from '../../types';

const AdminPublications: React.FC = () => {
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    { value: 'collection', label: 'Colección' },
    { value: 'magazine', label: 'Revista' },
    { value: 'recording', label: 'Grabación' },
    { value: 'video', label: 'Video' },
  ];

  const filteredPublications = React.useMemo(() => {
    return publications.filter(publication => {
      const matchesSearch = 
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || publication.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [publications, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Publicaciones</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nueva Publicación
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPublications.map((publication) => (
          <div key={publication.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <p className="ml-2 text-sm font-medium text-green-600">
                      {categories.find(cat => cat.value === publication.category)?.label}
                    </p>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {publication.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {publication.author}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ${publication.price}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-end space-x-4">
                  <button
                    className="text-green-600 hover:text-green-900"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPublications;
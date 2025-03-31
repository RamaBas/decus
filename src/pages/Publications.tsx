import React from 'react';
import { ShoppingCart, ExternalLink, Search, Filter } from 'lucide-react';
import type { Publication } from '../types';
import AlphabetFilter from '../components/AlphabetFilter';
import { useAlphabetFilter } from '../hooks/useAlphabetFilter';

const Publications: React.FC = () => {
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedLetter, setSelectedLetter] = React.useState<string>('');

  const categories = [
    { value: 'collection', label: 'Colecciones' },
    { value: 'magazine', label: 'Revistas' },
    { value: 'recording', label: 'Grabaciones' },
    { value: 'video', label: 'Videos' },
  ];

  // First apply category and search filters
  const filteredBySearch = React.useMemo(() => {
    return publications.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [publications, searchTerm, selectedCategory]);

  // Then apply alphabet filter
  const filteredPublications = useAlphabetFilter(
    filteredBySearch,
    selectedLetter,
    (pub) => pub.title
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Publicaciones</h1>
        <p className="mt-4 text-xl text-gray-500">
          Explore nuestras colecciones y publicaciones académicas
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título o autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
      </div>

      {/* Alphabet Filter */}
      <AlphabetFilter
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPublications.map((publication) => (
          <div key={publication.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={publication.coverUrl}
                alt={publication.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{publication.title}</h3>
              <p className="mt-2 text-sm text-green-600 uppercase">
                {categories.find(cat => cat.value === publication.category)?.label}
              </p>
              <p className="mt-2 text-gray-600">{publication.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${publication.price.toFixed(2)}
                </span>
                <a
                  href={publication.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Comprar
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
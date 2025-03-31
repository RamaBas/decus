import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import AlphabetFilter from '../components/AlphabetFilter';
import { useAlphabetFilter } from '../hooks/useAlphabetFilter';
import { useBooks } from '../hooks/useBook';

const Library: React.FC = () => {
  const { books, loading, error } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  // First apply category and search filters
  const filteredBySearch = useMemo(() => {
    if (!books) return [];

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  // Then apply alphabet filter
  const filteredBooks = useAlphabetFilter(
    filteredBySearch,
    selectedLetter,
    (book) => book.title
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Biblioteca "Prof. Elvira Morra"
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Explore nuestra extensa colección de material bibliográfico
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título, autor o palabra clave..."
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
              {books &&
                [...new Set(books.map((book) => book.category))].map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>
      </div>

      {/* Alphabet Filter (Before the grid) */}
      <AlphabetFilter
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />

      {/* Books Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Cargando libros...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error al cargar los libros</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full col-span-full">
              No se encontraron libros que coincidan con la búsqueda.
            </p>
          )}
        </div>
      )}

      {/* Alphabet Filter (After the grid) */}
      <AlphabetFilter
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />
    </div>
  );
};

export default Library;

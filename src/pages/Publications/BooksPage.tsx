// pages/BooksPage.tsx
import { useEffect, useState } from 'react';
import { fetchBooksFromGoogleSheet } from '../../services/excelApi';
import BookCard from '../../components/products/BookCard';
import { Book } from '../../types';

type Collection = {
  name: string;
  sheetName: string;
  books: Book[];
  prefix: string;
};

const BooksPage = () => {
  const [collections, setCollections] = useState<Collection[]>([
    { 
      name: 'OBRAS COMPLETAS CAD', 
      sheetName: 'CAD', 
      books: [],
      prefix: 'cad-' 
    },
    { 
      name: 'COLECCIÓN ALETHEIA', 
      sheetName: 'Aletheia', 
      books: [],
      prefix: 'aletheia-' 
    },
    { 
      name: 'COLECCIÓN MNEMOSYNE', 
      sheetName: 'Mnemosyne', 
      books: [],
      prefix: 'mnemosyne-' 
    },
    { 
      name: 'REVISTA NOEIN', 
      sheetName: 'Noein', 
      books: [],
      prefix: 'noein-' 
    },
  ]);
  
  const [activeCollection, setActiveCollection] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const results = await Promise.all(
          collections.map(async (collection) => {
            const books = await fetchBooksFromGoogleSheet(collection.sheetName);
            return {
              ...collection,
              books: books.map((book, index) => ({
                ...book,
                id: `${collection.prefix}${createBookSlug(book.title)}-${index}`
              }))
            };
          })
        );
        setCollections(results);
      } catch (error) {
        console.error('Error loading collections:', error);
      } finally {
        setLoading(false);
      }
    }
  
    loadData();
  }, []);
  
  // Función auxiliar para crear slugs
  const createBookSlug = (str: string) => {
    return str.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const filteredBooks = collections[activeCollection].books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Tienda</h1>
      
      {/* Selector de colecciones */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {collections.map((collection, index) => (
          <button
            key={collection.sheetName}
            onClick={() => setActiveCollection(index)}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeCollection === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {collection.name}
          </button>
        ))}
      </div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder={`Buscar en ${collections[activeCollection].name}...`}
        className="w-full p-2 border rounded mb-6"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {/* Estado de carga */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Resultados */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={`${book.id}-${book.title}`} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              {query
                ? `No se encontraron resultados para "${query}" en ${collections[activeCollection].name}`
                : `No hay libros disponibles en ${collections[activeCollection].name}`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BooksPage;
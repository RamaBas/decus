import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { useBooks } from '../../hooks/useBook';
import { BookModal } from '../../components/Modals/BookModal';
import { Book } from '../../types';

const AdminBooks: React.FC = () => {
  const { books, createBook, updateBook, deleteBook, loading, error } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const filteredBooks = React.useMemo(() => {
    return books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  const handleOpenModal = (book?: Book) => {
    setCurrentBook(book || null);
    setIsModalOpen(true);
  };

  const handleSave = (bookData: Book) => {
    console.log("currentBook", currentBook?.id);
    console.log("bookData", bookData);
    if (currentBook) {
      updateBook(currentBook?.id, {...bookData });
    } else {
      createBook({ id: Date.now().toString(), ...bookData });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de Biblioteca</h1>
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Nuevo Libro
        </button>
      </div>

      {isModalOpen && (
        <BookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          book={currentBook}
        />
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Todas las categorías</option>
            <option value="fiction">Ficción</option>
            <option value="nonfiction">No Ficción</option>
            <option value="reference">Referencia</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 relative"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 flex items-center">
                        <img className="h-10 w-10 rounded object-cover" src={book.coverUrl} alt={book.title} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleOpenModal(book)}>
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => deleteBook(book.id)}>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;

// pages/BooksPage.tsx
import { useEffect, useState } from 'react';
import { fetchBooksFromGoogleSheet } from '../../services/excelApi';
import BookCard from '../../components/products/BookCard';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchBooksFromGoogleSheet().then(setBooks);
  }, []);

  const filtered = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar libros..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filtered.map(book => <BookCard key={book.title} book={book} />)}
      </div>
    </div>
  );
};

export default BooksPage;
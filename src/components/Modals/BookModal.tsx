import React, { useState } from 'react';
import { useBooks } from '../../hooks/useBook';


export const BookModal = ({ onClose }) => {
  const { createBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [indexUrl, setIndexUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      category,
      cover_url: coverUrl,
      index_url: indexUrl,
      keywords,
      description,
    };

    await createBook(newBook);
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Libro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Seleccionar Categoría</option>
            <option value="fiction">Ficción</option>
            <option value="nonfiction">No Ficción</option>
            <option value="reference">Referencia</option>
          </select>
          <input
            type="text"
            placeholder="URL de la portada"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="URL del índice"
            value={indexUrl}
            onChange={(e) => setIndexUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Palabras clave"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

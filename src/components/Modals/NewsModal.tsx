import { useEffect, useState } from "react";
import { News } from "../../types";
import FormattedDate from "../utils/formattedDate";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news?: News | null;
  onSave: (news: News) => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, news, onSave }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(FormattedDate(new Date()));

  useEffect(() => {
    if (news) {
      setTitle(news.title || '');
      setContent(news.content || '');
      setDate(news.date || '');
    }
  }, [news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newsData: News = {
      id: news?.id || undefined,
      title,
      content,
      date,
    };

    onSave(newsData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {news ? 'Editar Novedad' : 'Nueva Novedad'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Título</label>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contenido</label>
            <textarea
              placeholder="Descripción"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {news ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

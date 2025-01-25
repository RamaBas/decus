import React from 'react';
import { Calendar } from 'lucide-react';
import type { News as NewsType } from '../types';

const News: React.FC = () => {
  const [news, setNews] = React.useState<NewsType[]>([]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Novedades</h1>
        <p className="mt-4 text-xl text-gray-500">
          Manténgase actualizado con las últimas noticias y eventos
        </p>
      </div>

      <div className="grid gap-8">
        {news.map((item) => (
          <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(item.date).toLocaleDateString('es-AR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {item.title}
              </h2>
              <div className="mt-4 prose max-w-none text-gray-600">
                {item.content}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
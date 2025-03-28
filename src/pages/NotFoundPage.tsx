import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home } from 'lucide-react'; // Iconos de Lucide

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {/* Icono de libro cerrado/error (BookX) */}
        <div className="flex justify-center mb-4">
          <BookX className="w-16 h-16 text-red-500" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que buscas no está disponible.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
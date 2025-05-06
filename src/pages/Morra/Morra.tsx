import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Music, Image, FileText } from 'lucide-react';
import Biblioteca from './Biblioteca';
import Discoteca from './Discoteca';

const MorraLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const sections = [
    { name: 'Biblioteca', path: '/morra', icon: Book }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Biblioteca "Prof. Elvira Morra"</h1>
      </div>

      <nav className="bg-white shadow rounded-lg">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.path}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  location.pathname === section.path
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <section.icon className="h-5 w-5 mr-2" />
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};


const Morra: React.FC = () => {
  return (
    <MorraLayout>
      <Routes>
        <Route index element={<Biblioteca />} />
      </Routes>
    </MorraLayout>
  );
};

export default Morra;
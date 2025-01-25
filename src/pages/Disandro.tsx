import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Music, Image, FileText } from 'lucide-react';

const DisandroLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const sections = [
    { name: 'Trayectoria', path: '/disandro', icon: FileText },
    { name: 'Biblioteca', path: '/disandro/library', icon: Book },
    { name: 'Discoteca', path: '/disandro/music', icon: Music },
    { name: 'Galería', path: '/disandro/gallery', icon: Image },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Carlos A. Disandro</h1>
        <p className="mt-4 text-xl text-gray-500">
          Explorar la vida y obra de un académico excepcional
        </p>
      </div>

      <nav className="bg-white shadow rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {sections.map((section) => (
              <Link
                key={section.name}
                to={section.path}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  location.pathname === section.path
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
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

const Trayectoria: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Trayectoria Académica</h2>
    <div className="prose max-w-none">
      <p className="text-gray-600">
        Carlos Alberto Disandro fue un destacado académico, filólogo y humanista argentino. 
        Su trabajo se centró en el estudio de las lenguas clásicas, la literatura y la cultura antigua.
      </p>
      {/* Add more content about Disandro's academic career */}
    </div>
  </div>
);

const Biblioteca: React.FC = () => (
  <div className="space-y-8">
    <div className="bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Biblioteca Personal</h2>
      {/* Add search and filter components */}
      {/* Add book list component */}
    </div>
  </div>
);

const Discoteca: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Colección Musical</h2>
    {/* Add music collection grid */}
  </div>
);

const Galeria: React.FC = () => (
  <div className="bg-white shadow rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería Fotográfica</h2>
    {/* Add photo gallery grid */}
  </div>
);

const Disandro: React.FC = () => {
  return (
    <DisandroLayout>
      <Routes>
        <Route index element={<Trayectoria />} />
        <Route path="library" element={<Biblioteca />} />
        <Route path="music" element={<Discoteca />} />
        <Route path="gallery" element={<Galeria />} />
      </Routes>
    </DisandroLayout>
  );
};

export default Disandro;
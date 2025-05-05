import React from 'react';
import { Link } from 'react-router-dom';
import { Book, GraduationCap, Library, Calendar, BookOpen, Bell } from 'lucide-react';
import logo from '../assets/logo.jpg'; // Asegúrate de que la ruta sea correcta

const features = [
  {
    name: 'Biblioteca "Prof. Elvira Morra"',
    description: 'Explore nuestra extensa colección de material bibliográfico.',
    icon: Library,
    href: '/library'
  },
  {
    name: 'Carlos A. Disandro',
    description: 'Conozca la trayectoria académica y obras del profesor.',
    icon: Book,
    href: '/disandro'
  },
  {
    name: 'Académicos',
    description: 'Descubra nuestros académicos honorarios y ordinarios.',
    icon: GraduationCap,
    href: '/academics'
  },
  {
    name: 'Actividades',
    description: 'Participe en nuestros cursos, seminarios y eventos culturales.',
    icon: Calendar,
    href: '/activities'
  },
  {
    name: 'Publicaciones',
    description: 'Acceda a nuestras colecciones y publicaciones académicas.',
    icon: BookOpen,
    href: '/publications'
  },
  {
    name: 'Novedades',
    description: 'Manténgase actualizado con las últimas noticias y eventos.',
    icon: Bell,
    href: '/news'
  }
];

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Biblioteca"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        </div>
        <div className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Fundación DECUS"
              className="w-[90%] h-auto object-contain drop-shadow-lg" // Ajusta el tamaño según necesites
            />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Nuestros Recursos
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Acceda a nuestra amplia gama de servicios y recursos académicos
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
              <span
                className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Últimas Novedades
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Manténgase actualizado con nuestras últimas actividades y noticias
            </p>
          </div>
          {/* News items will be dynamically loaded here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
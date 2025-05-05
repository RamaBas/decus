import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Book, GraduationCap, Calendar, BookOpen, Bell, Menu, X } from 'lucide-react';
import CartIcon from './cart/CartIcon';
import logo from '../assets/logoUnic.png';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const navigation = [
    { name: 'Quiénes Somos', href: '/about', icon: Book },
    { name: 'Carlos A. Disandro', href: '/disandro', icon: GraduationCap },
    { name: 'Biblioteca "Prof. Elvira Morra"', href: '/morra', icon: GraduationCap },
    { name: 'Académicos', href: '/academics', icon: GraduationCap },
    { name: 'Actividades Realizadas', href: '/activities', icon: Calendar },
    { name: 'Publicaciones', href: '/publications', icon: BookOpen, submenu: [
        { name: 'Tienda', href: '/publications/tienda' },
        { name: 'Grabaciones', href: '/publications/grabaciones' },
        { name: 'Videos', href: '/publications/videos' }
      ] 
    },
    { name: 'Novedades', href: '/news', icon: Bell },
    { name: 'Admin', href: '/admin/login', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
            <img 
            src={logo} 
            alt="Logo Fundación DECUS" 
            className="h-20 w-auto object-contain" // Ajusta la altura según necesites
          />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setIsSubmenuOpen(true)}
                  onMouseLeave={() => item.submenu && setIsSubmenuOpen(false)}
                >
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>

                  {/* Submenú de Publicaciones */}
                  {item.submenu && isSubmenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <CartIcon />
            </nav>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </div>
                  </Link>

                  {/* Submenú en mobile (colapsable) */}
                  {item.submenu && (
                    <div className="ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-gray-600 hover:text-gray-900 px-3 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Contacto
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-500">Fundación DECUS</p>
                <p className="text-gray-500">contacto@decus.edu.ar</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Enlaces Rápidos
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Redes Sociales
              </h3>
              <div className="mt-4 space-y-2">
                <a href="#" className="text-gray-500 hover:text-gray-900">Facebook</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Fundación<noscript></noscript> DECUS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

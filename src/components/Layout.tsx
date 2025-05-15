import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Book,
  GraduationCap,
  Calendar,
  BookOpen,
  Bell,
  Menu,
  X,
  Library
} from 'lucide-react';
import CartIcon from './cart/CartIcon';
import logo from '../assets/logoUnic.png';
import { useAcademics } from '../hooks/useAcademics';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [honoraryAcademics, setHonoraryAcademics] = useState<any[]>([]);
  const [ordinaryAcademics, setOrdinaryAcademics] = useState<any[]>([]);

  const { getAcademics } = useAcademics();

  useEffect(() => {
    const fetchAcademics = async () => {
      try {
        const fetchedAcademics = await getAcademics();
        const honorarios = fetchedAcademics.filter((a) => a.type === 'honorary');
        const ordinarios = fetchedAcademics.filter((a) => a.type !== 'honorary');
        setHonoraryAcademics(honorarios);
        setOrdinaryAcademics(ordinarios);
      } catch (error) {
        console.error('Error fetching academics:', error);
      }
    };

    fetchAcademics();
  }, []);

  const navigation = [
    { name: 'Quiénes Somos', href: '/about', icon: Book },
    { name: 'Carlos A. Disandro', href: '/disandro', icon: GraduationCap },
    {
      name: 'Académicos',
      icon: GraduationCap,
      submenu: [
        {
          name: 'Honorarios',
          items: honoraryAcademics.map((a) => ({ name: a.name, href: `/academics/${a.id}` }))
        },
        {
          name: 'Ordinarios',
          items: ordinaryAcademics.map((a) => ({ name: a.name, href: `/academics/${a.id}` }))
        }
      ]
    },
    { name: 'Biblioteca "Prof. Elvira Morra"', href: '/morra', icon: GraduationCap },
    { name: 'Actividades', href: '/activities', icon: Calendar },
    {
      name: 'Publicaciones',
      href: '',
      icon: BookOpen,
      submenu: [
        { name: 'Tienda', href: '/publications/' },
        { name: 'Grabaciones', href: '/publications/grabaciones' },
        { name: 'Videos', href: '/publications/videos' }
      ]
    },
    { name: 'Novedades', href: '/news', icon: Bell },
    { name: 'Admin', href: '/admin/login', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <Library className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Fundación DECUS</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>

                  {item.submenu && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-56 bg-white shadow-md rounded-md z-10">
                      {item.submenu.map((sub, index) => (
                        <div key={index} className="group relative">
                          <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-default">
                            {sub.name}
                          </span>
                          {sub.items && sub.items.length > 0 && (
                            <div className="absolute top-0 left-full mt-0 w-56 bg-white shadow-md rounded-md z-20 hidden group-hover:block">
                              {sub.items.map((subItem: any) => (
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
                    </div>
                  )}
                </div>
              ))}
              <CartIcon />
            </nav>
          </div>
        </div>

        {/* Menú mobile si deseas adaptarlo luego */}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contacto</h3>
              <div className="mt-4 space-y-2">
                <p className="text-gray-500">Fundación DECUS</p>
                <p className="text-gray-500">contacto@decus.edu.ar</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Enlaces Rápidos</h3>
              <ul className="mt-4 space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-gray-500 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Redes Sociales</h3>
              <div className="mt-4 space-y-2">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Fundación DECUS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

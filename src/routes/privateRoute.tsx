import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  element: React.ReactNode;
  path?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  
  // Llamamos al hook useAuth directamente
  const isLogged = useAuth(); // Aquí usamos el hook directamente

  if (isLogged === null) {
    // Mientras verificamos si está autenticado, puedes mostrar un loader o algo similar
    return <div>Loading...</div>;
  }
  if (isLogged) {
    // Si está autenticado, mostramos el elemento
    return <>{element}</>;
  } else {
    // Si no está autenticado, redirigimos a la página de login
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
};

export default PrivateRoute;

import { useState, useEffect } from 'react';

export const useAuth = () => {
  let isAuthenticated = false;
    // Solo se ejecuta una vez cuando el componente se monta
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false
    }
  return isAuthenticated
};

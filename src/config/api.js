/**
 * Configuración de la API del backend usando variables de entorno
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_PREFIX: import.meta.env.VITE_API_PREFIX,
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

  ENDPOINTS: {
    AUTH: '/auth',
    ME: '/me',
    NIVELES: '/juego-iconos/niveles',
    PROGRESO: '/juego-iconos/progreso',
    INICIAR_NIVEL: '/juego-iconos/iniciar-nivel',
    COMPLETAR_NIVEL: '/juego-iconos/completar-nivel',
    GUARDAR_PARTIDA: '/juego-iconos/guardar-partida',
    ESTADISTICAS: '/juego-iconos/estadisticas',
  },
};

/**
 * Construir URL completa
 */
export const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${endpoint}`;
};

/**
 * Manejo del token
 */
export const getAuthToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');
  if (tokenFromUrl) {
    localStorage.setItem('auth_token', tokenFromUrl);
    return tokenFromUrl;
  }
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => localStorage.removeItem('auth_token');
export const hasAuthToken = () => !!getAuthToken();

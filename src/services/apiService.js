// src/services/apiService.js

import { buildUrl, getAuthToken } from '../config/api';

/**
 * Clase para manejar errores de API
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Hacer petición HTTP con autenticación
 */
const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new ApiError('No hay token de autenticación', 401);
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Error en la petición',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error de conexión con el servidor', 0, error);
  }
};

/**
 * API Service - Funciones para comunicarse con el backend
 */
const apiService = {
  /**
   * Verificar autenticación del usuario
   */
  async verificarAuth() {
    try {
      const url = buildUrl('/me');
      const response = await fetchWithAuth(url);
      return response;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      throw error;
    }
  },

  /**
   * Obtener todos los niveles con el progreso del usuario
   */
  async obtenerNiveles() {
    try {
      const url = buildUrl('/juego-iconos/niveles');
      const response = await fetchWithAuth(url);
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener niveles:', error);
      throw error;
    }
  },

  /**
   * Obtener progreso general del usuario
   */
  async obtenerProgreso() {
    try {
      const url = buildUrl('/juego-iconos/progreso');
      const response = await fetchWithAuth(url);
      return response.data || {};
    } catch (error) {
      console.error('Error al obtener progreso:', error);
      throw error;
    }
  },

  /**
   * Iniciar un nivel (marcarlo como "en progreso")
   */
  async iniciarNivel(nivelId) {
    try {
      const url = buildUrl('/juego-iconos/iniciar-nivel');
      const response = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({ nivel_id: nivelId }),
      });
      return response;
    } catch (error) {
      console.error('Error al iniciar nivel:', error);
      throw error;
    }
  },

  /**
   * Completar un nivel
   */
  async completarNivel(nivelId, tiempoJugado, movimientosRealizados, intentosFallidos = 0) {
    try {
      const url = buildUrl('/juego-iconos/completar-nivel');
      const response = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          nivel_id: nivelId,
          tiempo_jugado: tiempoJugado,
          movimientos_realizados: movimientosRealizados,
          intentos_fallidos: intentosFallidos,
        }),
      });
      return response;
    } catch (error) {
      console.error('Error al completar nivel:', error);
      throw error;
    }
  },

  /**
   * Guardar una partida (completada o no)
   */
  async guardarPartida(nivelId, tiempoJugado, movimientosRealizados, completado, intentosFallidos = 0) {
    try {
      const url = buildUrl('/juego-iconos/guardar-partida');
      const response = await fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          nivel_id: nivelId,
          tiempo_jugado: tiempoJugado,
          movimientos_realizados: movimientosRealizados,
          completado: completado,
          intentos_fallidos: intentosFallidos,
        }),
      });
      return response;
    } catch (error) {
      console.error('Error al guardar partida:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas del usuario
   */
  async obtenerEstadisticas() {
    try {
      const url = buildUrl('/juego-iconos/estadisticas');
      const response = await fetchWithAuth(url);
      return response.data || {};
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },
};

export default apiService;
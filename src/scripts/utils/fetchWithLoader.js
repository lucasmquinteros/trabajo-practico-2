import state from "../store/state.js";

/**
 * Módulo que intercepta todas las llamadas fetch para mostrar/ocultar automáticamente
 * el loader durante las peticiones HTTP.
 */

// Guarda la función fetch original
const originalFetch = window.fetch;

/**
 * Reemplaza la función fetch global con una versión personalizada que muestra
 * y oculta automáticamente el loader durante las peticiones.
 * @param {...any} args - Argumentos originales de fetch
 * @returns {Promise<Response>} - Respuesta de la petición fetch
 */
window.fetch = async function (...args) {
  try {
    state.utils.showLoader();
    const response = await originalFetch.apply(this, args);
    return response;
  } catch (error) {
    throw error;
  } finally {
    setTimeout(() => {
      state.utils.hideLoader();
    }, 300);
  }
};

/**
 * Configura el interceptor de fetch. Esta función se llama al iniciar la aplicación.
 * El reemplazo de fetch se realiza automáticamente al importar este módulo.
 */
export default function setupFetchInterceptor() {
  console.log("Fetch interceptor configurado");
}

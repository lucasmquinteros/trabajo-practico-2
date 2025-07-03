/**
 * Módulo que gestiona el estado global de la aplicación.
 * Contiene datos compartidos y utilidades comunes.
 */

const state = {
  API_URL: "https://rickandmortyapi.com/api",

  currentPage: 1,
  totalPages: 1,
  characters: [],
  episodes: [],
  locations: [],

  filters: {
    name: "",
    species: "",
    status: "",
  },

  // Contador para llevar un registro de las peticiones activas
  activeRequests: 0,

  /**
   * Utilidades para manipular la interfaz y gestionar operaciones comunes
   */
  utils: {
    /**
     * Muestra el loader en la interfaz y aumenta el contador de peticiones activas
     * @param {string} message - Mensaje opcional para mostrar (no implementado actualmente)
     */
    showLoader: (message = "") => {
      // Incrementar el contador de peticiones activas
      state.activeRequests++;

      const loader = document.getElementById("loader");
      if (loader) {
        // Asegurarse de que el loader tenga el estilo display:flex para centrar su contenido
        loader.style.display = "flex";
      }
    },

    /**
     * Oculta el loader si no hay peticiones activas pendientes
     * Disminuye el contador de peticiones activas
     */
    hideLoader: () => {
      // Decrementar el contador de peticiones activas
      if (state.activeRequests > 0) {
        state.activeRequests--;
      }

      // Solo ocultar el loader si no hay peticiones activas
      if (state.activeRequests === 0) {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
      }
    },

    /**
     * Muestra u oculta el botón de cargar más según haya más páginas disponibles
     */
    toggleLoadMoreButton: () => {
      const btn = document.getElementById("nextPage");
      if (btn)
        btn.style.display =
          state.currentPage < state.totalPages ? "block" : "none";
    },

    /**
     * Muestra un mensaje de error en el contenedor correspondiente
     * @param {string} message - Mensaje de error a mostrar
     */
    showError: (message) => {
      const errorContainer = document.getElementById("error-container");
      if (errorContainer) {
        errorContainer.innerHTML = `<p>${message}</p>`;
        errorContainer.style.display = "block";
      }
    },
  },
};

export default state;

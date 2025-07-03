import state from "../store/state.js";

/**
 * Módulo que contiene las funciones para obtener datos de ubicaciones desde la API
 */

const API_URL = state.API_URL;

/**
 * Obtiene todas las ubicaciones disponibles en la API
 * @returns {Promise<Array>} - Lista completa de ubicaciones de todas las páginas
 */
export const getLocations = async () => {
    try {
        state.utils.showLoader();
        const response = await fetch(`${API_URL}/location`);
        const data = await response.json();

        const totalPages = data.info.pages;
        const allLocations = [...data.results];


        const fetches = [];
        for (let i = 2; i <= totalPages; i++) {
            fetches.push(fetch(`${API_URL}/location?page=${i}`).then(res => res.json()));
        }

        const pages = await Promise.all(fetches);

        pages.forEach(page => {
            allLocations.push(...page.results);
        });

        return allLocations;
    } finally {
        state.utils.hideLoader();
    }
};
/**
 * Obtiene una ubicación específica por su ID
 * @param {number|string} id - ID de la ubicación a obtener
 * @returns {Promise<Object>} - Datos de la ubicación
 */
export const getLocationById = async (id) => {
    try {
        state.utils.showLoader();
        const response = await fetch(`${API_URL}/location/${id}`);
        return await response.json();
    } finally {
        state.utils.hideLoader();
    }
}

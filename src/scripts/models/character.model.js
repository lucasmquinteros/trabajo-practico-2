import state from "../store/state.js"
const API_URL = state.API_URL;

/**
 * Módulo que contiene las funciones para interactuar con la API de Rick and Morty
 * relacionadas con los personajes.
 */


/**
 * Obtiene una lista de personajes de la API con filtros opcionales y paginación
 * @param {Object} filters - Filtros para la búsqueda (name, status, species, etc.)
 * @param {number} page - Número de página a consultar
 * @returns {Promise<Object>} - Datos de personajes y metadatos de paginación
 */
export const getCharacters = async (filters = {}, page = 1) => {
    try {
        state.utils.showLoader();
        const params = new URLSearchParams({ ...filters, page: page.toString() });
        const response = await fetch(`${API_URL}/character?${params.toString()}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Error fetching characters");
        }

        return response.json();
    } finally {
        state.utils.hideLoader();
    }
};

/**
 * Obtiene los detalles de un personaje específico por su ID
 * @param {string|number} id - ID del personaje a consultar
 * @returns {Promise<Object>} - Datos completos del personaje
 */
export const getCharacterById = async (id) => {
    try {
        state.utils.showLoader();
        const response = await fetch(`${API_URL}/character/${id}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Error fetching characters");
        }
        return response.json();
    } finally {
        state.utils.hideLoader();
    }
}

/**
 * Obtiene información de los episodios en los que aparece un personaje
 * @param {Array<string>} episodes - Array de URLs de episodios
 * @returns {Promise<Array<Object>>} - Datos de los episodios
 */
export const getEpisodesInCharacter = async (episodes) => {
    try {
        state.utils.showLoader();
        const requests = episodes.map(url => fetch(url).then(res => res.json()));
        return await Promise.all(requests);
    } finally {
        state.utils.hideLoader();
    }
};




/**
 * Obtiene todos los personajes de una especie específica, con filtros opcionales
 * Realiza múltiples peticiones en paralelo para obtener todas las páginas
 * @param {string} species - Especie a buscar
 * @param {string} name - Nombre para filtrar (opcional)
 * @param {string} status - Estado para filtrar (opcional)
 * @returns {Promise<Array<Object>>} - Array con todos los personajes que coinciden
 */
export const fetchAllBySpeciesFaster = async (species, name = "", status = "") => {
    try {
        state.utils.showLoader(`Buscando ${species}...`)
        const params = new URLSearchParams();
        if (species) params.append("species", species);
        if (name) params.append("name", name);
        if (status) params.append("status", status);

        const firstPageUrl = `${API_URL}/character/?${params.toString()}`;
        const firstResponse = await fetch(firstPageUrl);

        if (!firstResponse.ok) {
            if (firstResponse.status === 404) return [];
            throw new Error(`Error HTTP: ${firstResponse.status}`);
        }

        const firstData = await firstResponse.json();
        if (!firstData.results || firstData.results.length === 0) return [];

        const totalPages = firstData.info.pages;
        if (totalPages <= 1) return firstData.results;

        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
            params.set("page", page);
            const pageUrl = `${API_URL}/character/?${params.toString()}`;
            pagePromises.push(fetch(pageUrl).then(res => res.json()));
        }


        const pagesData = await Promise.all(pagePromises);


        return pagesData.reduce((acc, data) => {
            return [...acc, ...(data.results || [])];
        }, firstData.results);

    } catch (error) {
        console.error("Error en carga paralela:", error);
        throw error;
    } finally {
        state.utils.hideLoader();
    }
};
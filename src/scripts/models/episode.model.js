import state from "../store/state.js";

/**
 * Módulo que contiene las funciones para obtener datos de episodios desde la API
 */

const API_URL = state.API_URL;


/**
 * Obtiene un episodio específico por su ID
 * @param {number|string} id - ID del episodio a obtener
 * @returns {Promise<Object>} - Datos del episodio
 */
export async function getEpisodeById(id) {
    try {
        state.utils.showLoader();
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        return await response.json();
    } finally {
        state.utils.hideLoader();
    }
}

/**
 * Obtiene todos los episodios disponibles en la API
 * @returns {Promise<Array>} - Lista completa de episodios de todas las páginas
 */
export async function getAllEpisodes() {
    try {
        state.utils.showLoader();
        const response = await fetch(`${API_URL}/episode`);
        const data = await response.json();
        const totalPages = data.info.pages;

        let allEpisodes = [...data.results];

        const fetches = [];
        for (let i = 2; i <= totalPages; i++) {
            fetches.push(fetch(`${API_URL}/episode?page=${i}`).then(res => res.json()));
        }

        const results = await Promise.all(fetches);
        results.forEach(page => {
            allEpisodes = allEpisodes.concat(page.results);
        });

        return allEpisodes;
    } finally {
        state.utils.hideLoader();
    }
}
/**
 * Obtiene todos los personajes que aparecen en un episodio específico
 * @param {Array<string>} ids - Array de URLs de personajes
 * @returns {Promise<Array>} - Lista de personajes del episodio
 */
export async function getCharactersInEpisode(ids){
    try {
        state.utils.showLoader();
        const characters = [];
        for (const character of ids) {
            const response = await fetch(character).then(res => res.json()).catch((err) => {
                console.error(err)
                return null;
            })
            characters.push(response);
        }
        return characters;
    } finally {
        state.utils.hideLoader();
    }
}

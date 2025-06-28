import state from "../store/state.js"
const API_URL = state.API_URL;
export const getEpisode = async (id) => {
    const response = await fetch(`${API_URL}/episode/${id}`);
    return response.json();
}

export const getCharacters = async (filters = {}, page = 1) => {
    const params = new URLSearchParams({ ...filters, page: toString() });
    const response = await fetch(`${API_URL}/character?${params.toString()}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error fetching characters");
    }

    return response.json();
};

export const getAllCharacters = async () => {
    state.currentPage = 1;
    const characters = await getCharacters();
    if (characters?.results) {
        state.totalPages = characters.info.pages;
        return characters.results;
    }
};


export const fetchAllBySpeciesFaster = async (species, name = "", status = "") => {
    try {
        state.utils.showLoader(`Buscando ${species}...`)
        // Construir parámetros base
        const params = new URLSearchParams();
        if (species) params.append("species", species);
        if (name) params.append("name", name);
        if (status) params.append("status", status);

        // Primera petición para obtener metadatos
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

        // Crear promesas para las páginas restantes
        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
            params.set("page", page);
            const pageUrl = `${API_URL}/character/?${params.toString()}`;
            pagePromises.push(fetch(pageUrl).then(res => res.json()));
        }

        // Resolver todas las páginas en paralelo
        const pagesData = await Promise.all(pagePromises);

        // Combinar resultados
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
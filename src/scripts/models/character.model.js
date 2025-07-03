import state from "../store/state.js"
const API_URL = state.API_URL;


export const getCharacters = async (filters = {}, page = 1) => {
    const params = new URLSearchParams({ ...filters, page: page.toString() });
    const response = await fetch(`${API_URL}/character?${params.toString()}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error fetching characters");
    }

    return response.json();
};

export const getCharacterById = async (id) => {
    const response = await fetch(`${API_URL}/character/${id}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error fetching characters");
    }
    return response.json();
}

export const getEpisodesInCharacter = async (episodes) => {
    const requests = episodes.map(url => fetch(url).then(res => res.json()));
    return await Promise.all(requests);
};




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
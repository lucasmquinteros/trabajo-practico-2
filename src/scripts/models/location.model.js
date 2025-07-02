import state from "../store/state.js";

const API_URL = state.API_URL;

export const getLocations = async () => {
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
};
export const getLocationById = async (id) => {
    const response = await fetch(`${API_URL}/location/${id}`);
    return await response.json();
}

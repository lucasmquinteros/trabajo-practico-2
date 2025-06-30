import state from "../store/state.js";

const API_URL = state.API_URL;




export async function getEpisodeById(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    return await response.json();
}

export async function getAllEpisodes() {
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
}
export async function getCharactersInEpisode(ids){
    const characters = [];
    for (const character of ids) {
        const response = await fetch(character).then(res => res.json()).catch((err) => {
            console.error(err)
            return null;
        })
        characters.push(response);
    }
    return characters;
}

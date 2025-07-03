/**
 * Módulo de vista para los personajes.
 * Contiene funciones para renderizar personajes en la interfaz.
 */

/**
 * Renderiza una lista de personajes en el contenedor correspondiente
 * @param {Array<Object>} characters - Lista de personajes a renderizar
 * @param {boolean} reset - Si es true, limpia el contenedor antes de renderizar
 */
export const renderCharacters = (characters, reset = true) => {
    const container = document.getElementById("characters-container");
    if (reset) container.innerHTML = "";

    if (characters.length === 0) {
        container.innerHTML = `<p class="no-results">No characters found</p>`;
        return;
    }

    characters.forEach(character => {
        container.appendChild(createCharacterCard(character));
    });
};

/**
 * Crea un elemento HTML que representa una tarjeta de personaje
 * @param {Object} character - Datos del personaje
 * @returns {HTMLElement} - Elemento div con la información del personaje
 */
export const createCharacterCard = (character) => {
    const card = document.createElement("div");
    card.className = "character";
    card.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h3><a href="/character?id=${character.id}">${character.name}</a></h3>
    <p>${character.status} - ${character.species}</p>
  `;
    return card;
};


/**
 * Renderiza los detalles de un personaje en la página de detalle
 * @param {Object} character - Datos completos del personaje
 */
export const renderCharacterDetail = (character) => {
    document.getElementById("image").innerHTML = `<img src="${character.image}" alt="${character.name}" class="image">`
    document.getElementById("name-character").textContent = character.name;
    document.getElementById("About").textContent = `Status: ${character.status} | Specie: ${character.species} | Type: ${character.type ? character.type : 'Unknown'} | Gender: ${character.gender}`;
    document.getElementById("Origin").innerHTML = `Origin: ${character.origin.name} | Location: <a href=/location?id=${getLocationId()}>${character.location.name}</a>`;
    function getLocationId(){
        return character.location.url.split("/")[5]
    }
};


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

export const createCharacterCard = (character) => {
    const card = document.createElement("div");
    card.className = "character";
    card.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h3><a href="/src/pages/character.html?id=${character.id}">${character.name}</a></h3>
    <p>${character.status} - ${character.species}</p>
  `;
    return card;
};


// todo characters details renderized
export const renderCharacterDetail = (character) => {
    document.getElementById("image").innerHTML = `<img src="${character.image}" alt="${character.name}" class="image">`
    document.getElementById("name-character").textContent = character.name;
    document.getElementById("About").textContent = `Status: ${character.status} | Specie: ${character.species} | Type: ${character.type ? character.type : 'Unknown'} | Gender: ${character.gender}`;
    document.getElementById("Origin").innerHTML = `Origin: ${character.origin.name} | Location: <a href=/src/pages/location.html?id=${getLocationId()}>${character.location.name}</a>`;
    function getLocationId(){
        return character.location.url.split("/")[5]
    }
};


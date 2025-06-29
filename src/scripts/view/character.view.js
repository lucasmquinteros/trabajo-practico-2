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
    <h3><a href="/character.html?id=${character.id}" data-navigo>${character.name}</a></h3>
    <p>${character.status} - ${character.species}</p>
  `;
    return card;
};
// todo characters details renderized
export const renderCharacterDetail = (character) => {

};

/*
*
function renderCharacters(characters, reset = true) {
  const container = document.getElementById("characters-container");
  if (reset) container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateRows = `repeat(${Math.ceil(characters.length / 4)}, 1fr)`;

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.className = "character";
    characterElement.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3><a href="#" id="characterName">${character.name}</a></h3>
      <p>${character.status} - ${character.location.name}</p>
    `;
    container.appendChild(characterElement);
  });

  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = "";
  errorContainer.style.display = "none";
}*/
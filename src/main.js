const API_URL = "https://rickandmortyapi.com/api/character";
document.getElementById("searchName").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const name = document.getElementById("searchName").value.trim();
    try{
      getCharacters(name).then((characters) => {
        renderCharacters(characters.results);
      });
    }catch (error) {
      console.log(error)
    }
  }
});

async function getCharacters(name = "") {
  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) {
      throw new Error("No se encontraron personajes.");
    }
    return await response.json();
  } catch (error) {
    showError(error.message);
  }
}

function renderCharacters(characters) {
  const container = document.getElementById("characters-container");
  container.style.display = "grid";
  container.style.gridTemplateRows = `repeat(${characters.length}, 1fr)`;
  container.innerHTML = "";

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.className = "character";
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}">
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
    `;
    container.appendChild(characterElement);
  });
}

function showError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = `<p>Error: ${message}</p>`;
  errorContainer.style.display = "block";
}

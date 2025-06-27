const API_URL = "https://rickandmortyapi.com/api/character";
document.getElementById("searchBtn").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const name = document.getElementById("searchName").value.trim();
  }
  console.log(e.valueOf())
  getCharacters(name);
});

async function getCharacters(name = "") {
  try {
    const response = await fetch(`${API_URL}?name=${name}`);
    if (!response.ok) {
      throw new Error("No se encontraron personajes.");
    }

    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    showError(error.message);
  }
}

function renderCharacters(characters) {
  const container = document.getElementById("characters-container");
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

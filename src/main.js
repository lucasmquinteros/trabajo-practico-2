import createHeader from "./scripts/header.js";

const API_URL = "https://rickandmortyapi.com/api";

const filtros = {
  name: "",
  species: "",
  status: "",
};

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  getAllCharacters();
  getCharacterByInput();
  setupFilterListeners();
});

const getAllCharacters = () => {
  fetch(API_URL + "/character")
      .then((response) => response.json())
      .then((data) => renderCharacters(data.results));
};

const getCharacterByInput = () => {
  const input = document.getElementById("searchName");
  if (!input) return;

  input.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      filtros.name = input.value.trim();
      await applyFilter();
    }
  });
};

const setupFilterListeners = () => {
  const speciesSelect = document.getElementById("speciesFilter");
  const statusSelect = document.getElementById("statusFilter");

  if (speciesSelect) {
    speciesSelect.addEventListener("change", async (e) => {
      filtros.species = e.target.value;
      await applyFilter();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", async (e) => {
      filtros.status = e.target.value;
      await applyFilter();
    });
  }
};

const applyFilter = async () => {
  try {
    const characters = await getCharacters(filtros.name, filtros.species, filtros.status);

    if (!characters || !characters.results) {
      showError("No se encontraron personajes con esos filtros.");
      renderCharacters([]); // limpia los personajes mostrados
      return;
    }

    renderCharacters(characters.results);
  } catch (error) {
    console.error("Error al obtener personajes:", error);
  }
};


async function getCharacters(name = "", species = "", status = "") {
  const query = new URLSearchParams();

  if (name) query.append("name", name);
  if (species) query.append("species", species);
  if (status) query.append("status", status);

  const url = `${API_URL}/character/?${query.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "No se encontraron personajes.");
    }
    return await response.json();
  } catch (error) {
    showError(error.message);
    return null;
  }
}

function renderCharacters(characters) {
  const container = document.getElementById("characters-container");
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateRows = `repeat(${characters.length}, 1fr)`;

  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.className = "character";
    characterElement.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3><a href="#">${character.name}</a></h3>
      <p>${character.status} - ${character.location.name}</p>
    `;
    container.appendChild(characterElement);
  });
}

function showError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = `<p>Error: ${message}</p>`;
  errorContainer.style.display = "block";
}

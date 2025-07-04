import "../../styles/header.css";
import state from "../store/state.js";
import * as controller from "../controllers/characters.controller.js";
import * as viewEpisodes from "../view/episodes.view.js";
import * as viewLocation from "../view/locations.view.js";

function createHeader() {
  const $headerIndex = document.getElementById("header");
  const $navbar = document.createElement("nav");
  $navbar.className = "navbar";
  const $title = document.createElement("h2");
  const $container = document.createElement("div");
  const $ulHeader = document.createElement("ul");
  for (const navElement of Object.values(options)) {
    const $liHeader = document.createElement("li");
    const $aHeader = document.createElement("a");
    $aHeader.href = `/${navElement.toLowerCase()}`;
    $liHeader.appendChild($aHeader);
    $liHeader.firstElementChild.innerText = navElement;
    $liHeader.firstElementChild.className = "aHeader";
    $ulHeader.appendChild($liHeader);
  }
  const $a = document.createElement("a");
  $a.href = "/";
  $a.innerText = "Api & Morty";
  $title.appendChild($a);
  $title.className = "title";
  $ulHeader.className = "ulHeader";
  $ulHeader.id = "ulHeader";

  const $input = document.createElement("input");
  $input.type = "text";
  $input.id = "searchName";
  $input.className = "inputName";

  $container.className = "containerHeader";

  $container.appendChild($title);
  $container.appendChild($ulHeader);

  $navbar.appendChild($container);

  $headerIndex.appendChild($navbar);
  $headerIndex.appendChild($input);

  const $burger = document.createElement("button");
  $burger.innerHTML = "☰";
  $burger.className = "burger";
  $burger.setAttribute("aria-label", "Menu");
  $navbar.appendChild($container);
  $navbar.appendChild($ulHeader);

  $burger.addEventListener("click", () => {
    $ulHeader.classList.toggle("ulHeader--open");
  });
  $container.appendChild($burger);
  document.addEventListener("click", (e) => {
    const isClickInside = $navbar.contains(e.target);
    if (!isClickInside) {
      $ulHeader.classList.remove("ulHeader--open");
    }
  });

  $ulHeader.querySelectorAll("a").forEach(($a) => {
    $a.addEventListener("click", () => {
      $ulHeader.classList.remove("ulHeader--open");
    });
  });
  eventListeners();
}
const options = Object.freeze({
  Characters: "Characters",
  Episodes: "Episodes",
  Locations: "Locations",
});
export default createHeader;

const eventListeners = () => {
  const input = document.getElementById("searchName");
  const path = window.location.pathname.split("/")[1];

  const handleSearch = async () => {
    const searchValue = input.value.trim();

    if (path === "characters" || path === "") {
      state.filters.name = searchValue;
      await controller.applyFilter();

    } else if (path === "episodes" || path === "episode") {
      const filteredEpisodes = state.episodes.filter((episode) =>
          episode.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      viewEpisodes.renderEpisodes(filteredEpisodes);

    } else if (path === "locations" || path === "location") {
      const filteredLocations = state.locations.filter((location) =>
          location.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      viewLocation.renderLocations(filteredLocations);
    }
  };

  // Detecta "Enter" en teclado físico
  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      await handleSearch();
    }
  });

  // Detecta cambios o confirmaciones en móvil (teclado virtual)
  input.addEventListener("change", async () => {
    await handleSearch();
  });

  // Placeholder dinámico
  if (path === "characters" || path === "") {
    input.placeholder = "🔍  Search Character";
  } else if (path === "episodes" || path === "episode") {
    input.placeholder = "🔍  Search Episode";
  } else if (path === "locations" || path === "location") {
    input.placeholder = "🔍  Search Location";
  }
};

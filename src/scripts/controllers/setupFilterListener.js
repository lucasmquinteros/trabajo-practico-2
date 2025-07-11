import state from "../store/state.js";
import * as controller from "./characters.controller.js";
import * as view from "../view/character.view.js";
import * as model from "../models/character.model.js";

export const setupFilterListeners = () => {
  const speciesSelect = document.getElementById("speciesFilter");
  const statusSelect = document.getElementById("statusFilter");
  const aNextPage = document.getElementById("nextPage");
  const btnClearAll = document.getElementById("clearAll");

  if (btnClearAll) {
    btnClearAll.addEventListener("click", clearAllFilters);
  }

  if (aNextPage) {
    aNextPage.addEventListener("click", loadMoreCharacters);
  }

  if (speciesSelect) {
    speciesSelect.addEventListener("change", async (e) => {
      state.filters.species = e.target.value;
      await controller.applyFilter();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", async (e) => {
      state.filters.status = e.target.value;
      await controller.applyFilter();
    });
  }
};
function clearAllFilters() {
  state.filters.name = "";
  state.filters.species = "";
  state.filters.status = "";
  controller.applyFilter().catch(console.error);
}
const loadMoreCharacters = async () => {
  if (state.currentPage >= state.totalPages) return;

  try {
    state.utils.showLoader();

    state.currentPage++;
    console.log(state.currentPage);
    const characters = await model.getCharacters(
      state.filters,
      state.currentPage
    );

    if (characters?.results) {
      console.log(characters);
      view.renderCharacters(characters.results, false);
      state.utils.toggleLoadMoreButton();
    }
  } catch (error) {
    console.error("Error al cargar más personajes:", error);
    state.utils.showError(error.message);
  } finally {
    state.utils.hideLoader();
  }
};

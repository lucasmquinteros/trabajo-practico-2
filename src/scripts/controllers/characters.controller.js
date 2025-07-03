import * as model from "../models/character.model.js";
import * as view from "../view/character.view.js";
import state from "../store/state.js";

export const initCharacters = async () => {
    try {
        state.utils.showLoader();
        const data = await model.getCharacters();

        state.characters = data.results;
        state.totalPages = data.info.pages;

        view.renderCharacters(state.characters);
        state.utils.toggleLoadMoreButton();
    } catch (error) {
        state.utils.showError(error.message);
    } finally {
        state.utils.hideLoader();
    }
};
export const applyFilter = async () => {
    try {
        state.utils.showLoader();
        state.currentPage = 1;

        if (state.filters.species) {
            const allCharacters = await model.fetchAllBySpeciesFaster(state.filters.species, state.filters.name, state.filters.status);

            if (!allCharacters || allCharacters.length === 0) {
                state.utils.showError("No se encontraron personajes con esos filtros.");
                view.renderCharacters([], true);
                return;
            }

            state.totalPages = 1;
            view.renderCharacters(allCharacters, true);
            state.utils.toggleLoadMoreButton();
        } else {
            const characters = await model.getCharacters(state.filters, state.currentPage);

            if (!characters || !characters.results) {
                state.utils.showError("No se encontraron personajes con esos filtros.");
                view.renderCharacters([], true);
                return;
            }

            state.totalPages = characters.info.pages;
            view.renderCharacters(characters.results, true);
            state.utils.toggleLoadMoreButton();
        }
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        state.utils.showError(error.message || "Ocurrió un error al cargar los personajes");
    } finally {
        state.utils.hideLoader();
    }
};

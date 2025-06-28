import * as model from "../models/api.model.js";
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

        // Usar carga paralela solo cuando hay filtro de especie
        if (state.filters.species) {
            const allCharacters = await model.fetchAllBySpeciesFaster(state.filters.species, state.filters.name, state.filters.status);

            if (!allCharacters || allCharacters.length === 0) {
                state.utils.showError("No se encontraron personajes con esos filtros.");
                view.renderCharacters([], true);
                return;
            }

            state.totalPages = 1; // Ya tenemos todos los resultados
            view.renderCharacters(allCharacters, true);
            state.utils.toggleLoadMoreButton();
        } else {
            // Filtro normal (sin especie)
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






export const handleFilter = async () => {
    try {
        state.utils.showLoader();
        state.currentPage = 1;

        const filters = {
            name: state.filters.name,
            status: state.filters.status
        };

        const data = await model.getCharacters(filters);

        // Aplicar filtro de especie localmente si existe
        let results = data.results;
        if (state.filters.species) {
            results = results.filter(char =>
                char.species.toLowerCase() === state.filters.species.toLowerCase()
            );
        }

        view.renderCharacters(results, true);
        state.totalPages = data.info.pages;
        state.utils.toggleLoadMoreButton();
    } catch (error) {
        state.utils.showError(error.message);
    } finally {
        state.utils.hideLoader();
    }
};
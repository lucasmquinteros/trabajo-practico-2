import * as episodeModel from "../models/episode.model.js";
import state from "../store/state.js";
import { renderEpisodes } from "../view/episodes.view.js";
import createHeader from "../view/header.js";

/**
 * Controlador para la página de listado de episodios
 * Se encarga de obtener los datos y pasarlos a la vista
 */

/**
 * Inicializa la página de episodios
 * Configura el evento DOMContentLoaded para cargar los episodios cuando la página esté lista
 * @returns {void}
 */
export const makeEpisodes = () =>
  document.addEventListener("DOMContentLoaded", async () => {
    createHeader();
    const episodes = await episodeModel.getAllEpisodes();
    state.episodes = episodes;
    renderEpisodes(state.episodes);
  });

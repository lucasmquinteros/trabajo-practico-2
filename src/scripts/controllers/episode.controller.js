/**
 * Controlador para la página de detalle de episodio
 * Se encarga de obtener los datos del episodio y sus personajes, y pasarlos a la vista
 */

import createHeader from "../view/header.js";
import * as episodeModel from "../models/episode.model.js";
import {renderEpisode} from "../view/episodes.view.js";
import "../../styles/episode.css"
import {renderCharacters} from "../view/character.view.js";
import state from "../store/state.js";
/**
 * Inicializa la página de detalle de episodio
 * Obtiene el ID del episodio de la URL, carga sus datos y los personajes que aparecen en él
 * @returns {Promise<void>}
 */
const makeEpisode = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");


    if (!id) {
        window.history.back();
        return;
    }
    createHeader();
    const episode = await episodeModel.getEpisodeById(id);
    const characters = await episodeModel.getCharactersInEpisode(episode.characters);
    state.characters = characters;
    renderCharacters(state.characters, false);
    renderEpisode(episode);
};
makeEpisode().then(r => {})
/**
 * Controlador para la página de detalle de ubicación
 * Se encarga de obtener los datos de la ubicación y sus residentes, y pasarlos a la vista
 */

import {getLocationById} from "../models/location.model.js";
import {renderLocation} from "../view/locations.view.js";
import createHeader from "../view/header.js";
import "/src/styles/style.css"
import "/src/styles/location.css"
import {getCharactersInEpisode} from "../models/episode.model.js";
import {renderCharacters} from "../view/character.view.js";

/**
 * Inicializa la página de detalle de ubicación cuando el DOM está completamente cargado
 * Obtiene el ID de la ubicación de la URL, carga sus datos y los personajes residentes
 */
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        window.history.back();
    }
    createHeader()
    const location = await getLocationById(id)
    renderLocation(location)
    const charactersResidents = await getCharactersInEpisode(location.residents)
    renderCharacters(charactersResidents)
});


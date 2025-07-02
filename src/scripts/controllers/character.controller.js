import createHeader from "../view/header.js";
import {renderCharacterDetail} from "../view/character.view.js";
import {getCharacterById, getEpisodesInCharacter} from "../models/character.model.js";
import {renderEpisodes} from "../view/episodes.view.js";
import "../../styles/episodes.css"
import "../../styles/character.css"

const createCharacter = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        window.history.back();
    }
    const character = await getCharacterById(id)
    renderCharacterDetail(character)
    const episodes = await getEpisodesInCharacter(character.episode)
    renderEpisodes(episodes)
}
createHeader();
createCharacter().then(r => {});

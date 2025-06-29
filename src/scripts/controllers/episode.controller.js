import createHeader from "../view/header.js";
import * as episodeModel from "../models/episode.model.js";
import {renderEpisode} from "../view/episodes.view.js";
import "../../styles/episode.css"
export const makeEpisode = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");


    if (!id) {
        window.history.back();
        return;
    }
    createHeader();
    const episode = await episodeModel.getEpisodeById(id);
    renderEpisode(episode);
};
makeEpisode().then(r => {})
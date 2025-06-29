import * as episodeModel from "../models/episode.model.js";
import {renderEpisode, renderEpisodes} from "../view/episodes.view.js";
import createHeader from "../view/header.js";

export const makeEpisode = () => document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        window.history.back();
        return;
    }
    createHeader();
    const episode = await episodeModel.getEpisodeById(id);
    renderEpisode(episode);
});

export const makeEpisodes = () => document.addEventListener("DOMContentLoaded", async () => {
    createHeader()
    const episodes = await episodeModel.getAllEpisodes()
    renderEpisodes(episodes);
})
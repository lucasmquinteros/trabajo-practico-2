import * as episodeModel from "../models/episode.model.js";
import {renderEpisodes} from "../view/episodes.view.js";
import createHeader from "../view/header.js";

export const makeEpisodes = () => document.addEventListener("DOMContentLoaded", async () => {
    createHeader()
    const episodes = await episodeModel.getAllEpisodes()
    renderEpisodes(episodes);
})
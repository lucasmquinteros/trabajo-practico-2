import * as controller from "./scripts/controllers/episode.controller.js";

controller.makeEpisodes()

document.getElementById("aNameEpisode").addEventListener("click", controller.makeEpisodes)


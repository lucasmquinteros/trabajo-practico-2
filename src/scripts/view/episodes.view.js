import {renderCharacters} from "./character.view.js";
export const renderEpisodes = (episodes, reset=true) => {
    const container = document.getElementById("episodes-list");
    if(reset) container.innerHTML = "";
    for (const episode of episodes) {
        container.appendChild(createCardEpisode(episode))
    }
};
const createCardEpisode = (ep) => {
    const card = document.createElement("div");
    card.className = "episode";
    card.innerHTML = `<h2><a id="aNameEpisode" href="episode.html?id=${ep.id}">${ep.name}</a></h2>
  <p><strong>Number:</strong> ${ep.episode}</p>
  <p><strong>Date:</strong> ${ep.air_date}</p>
`
    return card;
}
export const renderEpisode = (episode) => {
    const $article1 = document.createElement('article');
    document.getElementById("main-section")
    document.getElementById("episode-name").innerText = episode.name;
    document.getElementById("episode-name-p1").innerText = episode.name;
    document.getElementById("air-date").innerText = episode.air_date;
    document.getElementById("episode-code").innerText = episode.episode;

}
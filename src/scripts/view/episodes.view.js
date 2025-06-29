export const renderEpisodes = (episodes, reset=true) => {
    const container = document.getElementById("episodes-list");
    if(reset) container.innerHTML = "";
    for (const episode of episodes) {
        container.appendChild(createCardEpisode(episode))
    }
};
const createCardEpisode = (ep) => {
    const card = document.createElement("div");
    card.innerHTML = `<h2><a id="aNameEpisode" href="episode.html?id=${ep.id}">${ep.name}</a></h2>
  <p><strong>Código:</strong> ${ep.episode}</p>
  <p><strong>Fecha:</strong> ${ep.air_date}</p>
`
    return card;
}
export const renderEpisode = (episode) => {
    const $article1 = document.createElement('article');
    $article1.style.display = 'grid';
    $article1.style.gridArea = ""
    document.getElementById("episodes-list")
}

/**
 * Módulo que contiene las funciones para renderizar episodios en la interfaz
 */

/**
 * Renderiza una lista de episodios en el contenedor correspondiente
 * @param {Array} episodes - Lista de episodios a renderizar
 * @param {boolean} reset - Si es true, limpia el contenedor antes de renderizar
 */
export const renderEpisodes = (episodes, reset=true) => {
    const container = document.getElementById("episodes-list");
    if(reset) container.innerHTML = "";
    for (const episode of episodes) {
        container.appendChild(createCardEpisode(episode))
    }
};
/**
 * Crea un elemento de tarjeta para un episodio
 * @param {Object} ep - Datos del episodio
 * @returns {HTMLElement} - Elemento DOM que representa la tarjeta del episodio
 */
const createCardEpisode = (ep) => {
    const card = document.createElement("div");
    card.className = "episode";
    card.innerHTML = `<h2><a id="aNameEpisode" href="/episode?id=${ep.id}">${ep.name}</a></h2>
  <p><strong>Number:</strong> ${ep.episode}</p>
  <p><strong>Date:</strong> ${ep.air_date}</p>
`
    return card;
}
/**
 * Renderiza los detalles de un episodio específico en la página de detalle
 * @param {Object} episode - Datos del episodio a renderizar
 */
export const renderEpisode = (episode) => {
    const $article1 = document.createElement('article');
    document.getElementById("main-section")
    document.getElementById("episode-name").innerText = episode.name;
    document.getElementById("episode-name-p1").innerText = episode.name;
    document.getElementById("air-date").innerText = episode.air_date;
    document.getElementById("episode-code").innerText = episode.episode;

}
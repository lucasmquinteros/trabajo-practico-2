/**
 * Módulo que contiene las funciones para renderizar ubicaciones en la interfaz
 */

/**
 * Renderiza una lista de ubicaciones en el contenedor correspondiente
 * @param {Array} locations - Lista de ubicaciones a renderizar
 */
export const renderLocations = (locations) => {
    const container = document.getElementById("locations-container");
    container.innerHTML = ""; // 🧽 Limpiar antes de agregar nuevas localizaciones

    locations.forEach(location => {
        const containerLocation = document.createElement("div");
        containerLocation.className = "location";
        containerLocation.innerHTML = `
            <div data-label="Name">
                <a href="/location?id=${location.id}">${location.name}</a>
            </div>
            <div data-label="Type">${location.type}</div>
            <div data-label="Dimension">${location.dimension ? location.dimension : "unknown"}</div>
        `;
        container.appendChild(containerLocation);
    });
};

/**
 * Renderiza los detalles de una ubicación específica en la página de detalle
 * @param {Object} location - Datos de la ubicación a renderizar
 */
export const renderLocation = (location) => {
    document.getElementById("title").textContent = location.name;
    document.getElementById("description").textContent = `Type: ${location.type} | Dimension: ${location.dimension ? location.dimension : "unknown"}`;
    document.getElementById("Residents").textContent += `(${location.residents.length})`
}
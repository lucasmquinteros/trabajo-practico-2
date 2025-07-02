export const renderLocations = (locations) => {
    const container = document.getElementById("locations-container");
    locations.forEach(location => {
    const containerLocation = document.createElement("div");
    containerLocation.className = "location";
    containerLocation.innerHTML = `<div  data-label="Name"><a href="/src/pages/location.html?id=${location.id}">${location.name}</a></div>
                    <div  data-label="Name">${location.type}</div>
                    <div  data-label="Name">${location.dimension ? location.dimension : "unknown"}</div>`
        container.appendChild(containerLocation);
    })
}

export const renderLocation = (location) => {
    document.getElementById("title").textContent = location.name;
    document.getElementById("description").textContent = `Type: ${location.type} | Dimension: ${location.dimension ? location.dimension : "unknown"}`;
    document.getElementById("Residents").textContent += `(${location.residents.length})`
}
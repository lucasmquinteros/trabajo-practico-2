const state = {
    API_URL: "https://rickandmortyapi.com/api",

    currentPage: 1,
    totalPages: 1,
    characters: [],

    filters: {
        name: "",
        species: "",
        status: ""
    },

    utils: {
        showLoader: () => {
            const loader = document.getElementById("loader");
            if (loader) loader.style.display = "block";
        },

        hideLoader: () => {
            const loader = document.getElementById("loader");
            if (loader) loader.style.display = "none";
        },

        toggleLoadMoreButton: () => {
            const btn = document.getElementById("nextPage");
            if (btn) btn.style.display = state.currentPage < state.totalPages ? "block" : "none";
        },

        showError: (message) => {
            const errorContainer = document.getElementById("error-container");
            if (errorContainer) {
                errorContainer.innerHTML = `<p>${message}</p>`;
                errorContainer.style.display = "block";
            }
        }
    }
};

export default state;
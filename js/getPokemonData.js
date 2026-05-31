import {
    templateCardBackgroundColor,
    templatePokemonHeightWeight,
    templatePokemonID,
    templatePokemonImage,
    templatePokemonName,
    templatePokemonType,
    templatePokemonTypes,
    templateEndDiv,
    templateOverlayBackgroundColor,
    templateOverlayCardColor,
    templateCloseButton,
    templateNavPrevButton,
    templateNavNextButton,
    templateOverlayTabs,
    templateMoreTab,
    templateStatsTab,
    templatePokemonStats,
} from "./templates.js";

const pokemonCache = {};
const pokemonLimit = 20;
let offset = 0;
let allPokemon = [];
let currentList = []; // Active List (Grid or Search)
let currentIndex = 0; // Index of Pokemon shown in Overlay

const pokedex = document.getElementById("pokedexGridID");
const overlayContainer = document.getElementById("overlayContainerID");

pokedex.addEventListener("click", (event) => {
    const card = event.target.closest(".pokemonCard");

    if (!card) return;

    const id = card.dataset.id;

    const index = currentList.findIndex((p) => p.id == id);
    console.log("index ==> " + index);

    openPokemonOverlay(index);
});

export async function loadAndRenderPokemon() {
    showLoader(true);
    const pokemonList = await loadPokemonList();
    // currentList = pokemonList;
    // currentList = [...currentList, ...pokemonList];
    allPokemon = [...allPokemon, ...pokemonList];
    currentList = [...allPokemon]; // Standard = alles
    console.log("currentList ====> " + currentList);

    renderPokemonCards(pokemonList);
    showLoader(false);
}

async function loadPokemonList() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemonDetails = [];

    for (let i = 0; i < data.results.length; i++) {
        const pokemon = data.results[i];
        const details = await loadPokemonDetails(pokemon.url);
        pokemonDetails.push(details);
    }
    return pokemonDetails;
}

async function loadPokemonDetails(url) {
    if (pokemonCache[url]) {
        console.log("FROM CACHE");
        return pokemonCache[url];
    }
    console.log("FETCH API");
    const response = await fetch(url);
    const data = await response.json();
    pokemonCache[url] = data;

    console.log(pokemonCache[url]);
    console.log("url ===> " + url);
    return data;
}

function renderPokemonCards(pokemonList) {
    let html = "";
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        //const pokedex = document.getElementById("pokedexGridID");
        html += createPokemonCard(pokemon);
    }
    pokedex.innerHTML += html;
}

function getTypesHTML(pokemon) {
    let typesHTML = "";

    for (let i = 0; i < pokemon.types.length; i++) {
        const type = pokemon.types[i].type.name;

        typesHTML += templatePokemonType(type);
    }
    return typesHTML;
}

function createPokemonCard(pokemon) {
    
    return `
        ${templateCardBackgroundColor(pokemon)}
        ${templatePokemonID(pokemon)}
        ${templatePokemonImage(pokemon)}
        ${templatePokemonName(pokemon)}
        ${templatePokemonHeightWeight(pokemon)}
        ${templatePokemonTypes()}
        ${getTypesHTML(pokemon)}
        ${templateEndDiv()}
        ${templateEndDiv()}
    `
}

const btnLoadMore = document.getElementById("btnLoadMoreID");
btnLoadMore.addEventListener("click", async () => {
    offset += pokemonLimit;
searchError.style.display = "none";
    await loadAndRenderPokemon();
});

// Container for loader animation
const loaderContainer = document.getElementById("loaderContainerID");

function showLoader(state) {
    if (state) {
        loaderContainer.classList.add("showLoader");
        document.body.classList.add("no-scroll");
        btnLoadMore.disabled = true;
    } else {
        loaderContainer.classList.remove("showLoader");
        document.body.classList.remove("no-scroll");
        btnLoadMore.disabled = false;
    }
}

// Load more pokemon
// async function loadNextPage() {
//     offset += pokemonLimit;
//     loadAndRenderPokemon();
// }

// async function openPokemonOverlay(id) {
//     // showLoader(true);

//     let pokemon = null;

//     // Cache suchen
//     for (let key in pokemonCache) {
//         if (pokemonCache[key].id == id) {
//             console.log("Pokemon from cache");
//             pokemon = pokemonCache[key];
//             break;
//         }
//     }

//     // falls nicht im Cache
//     if (!pokemon) {
//         console.log("Pokemon NOT from cache");

//         const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//         pokemon = await loadPokemonDetails(url);
//     }

//     overlayContainer.innerHTML = createOverlayHTML(pokemon);
//     overlayContainer.classList.add("active");
//     document.body.classList.add("no-scroll");

//     // showLoader(false);
// }

async function openPokemonOverlay(index) {
    currentIndex = index;

    let pokemon = currentList[currentIndex];

   
    if (!pokemon) {
        console.error("Pokemon not found");
        // const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
        // pokemon = await loadPokemonDetails(url);
        // currentList[currentIndex] = pokemon;
    }

    renderOverlay(pokemon);
}

function renderOverlay(pokemon) {
    overlayContainer.innerHTML = createOverlayHTML(pokemon);
    overlayContainer.classList.add("active");
    document.body.classList.add("no-scroll");

    updateNavButtons();
}

function showNextPokemon() {
    if (currentIndex >= currentList.length - 1) return;

    currentIndex++;
    renderOverlay(currentList[currentIndex]);
}

function showPreviousPokemon() {
    if (currentIndex <= 0) return;

    currentIndex--;
    renderOverlay(currentList[currentIndex]);
}

// Hide prev- or next-button with first or last picture
function updateNavButtons() {
    const prevBtn = overlayContainer.querySelector('[data-action="prev"]');
    const nextBtn = overlayContainer.querySelector('[data-action="next"]');

    if (!prevBtn || !nextBtn) return;

    prevBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
    nextBtn.style.visibility = currentIndex === currentList.length - 1 ? "hidden" : "visible";
}

// overlayContainer.addEventListener("click", (event) => {
//     if (event.target.id === "overlayContainer") {
//         closeOverlay();
//     }
// });

function closeOverlay() {
    overlayContainer.classList.remove("active");
    document.body.classList.remove("no-scroll");
    overlayContainer.innerHTML = "";
}

// function getAbilitiesHTML() {
//     let abilitiesHTML = "";

//     for (let i = 0; i < pokemon.abilities.length; i++) {
//         abilitiesHTML += `

//                 ${pokemon.abilities[i].ability.name}
//                 ${i < pokemon.abilities.length - 1 ? "," : ""}

//         `;
//     }
//     return abilitiesHTML;
// }

function getStatsHTML(pokemon) {
    let statsHTML = "";

    for (let i = 0; i < pokemon.stats.length; i++) {
        const stat = pokemon.stats[i];

        const statPercent = (stat.base_stat / 255) * 100;

        statsHTML += templatePokemonStats(stat, statPercent);
    }
    return statsHTML;
}

function createOverlayHTML(pokemon) {

    return`
        ${templateOverlayBackgroundColor(pokemon)}
        ${templateOverlayCardColor(pokemon)}
        ${templatePokemonID(pokemon)}
        ${templateCloseButton()}
        ${templatePokemonImage(pokemon)}
        ${templateNavPrevButton()}
        ${templatePokemonName(pokemon)}
        ${templateNavNextButton()}
        ${templateOverlayTabs()}
        ${templateMoreTab()}
        ${templatePokemonHeightWeight(pokemon)}
        ${templatePokemonTypes()}
        ${getTypesHTML(pokemon)}
        ${templateEndDiv()}
        ${templateStatsTab()}
        ${getStatsHTML(pokemon)}
        ${templateEndDiv()} 
        ${templateEndDiv()}
    `
}

// function showTab(tab) {
//     const moreTab = document.getElementById("moreTab");
//     const statsTab = document.getElementById("statsTab");

//     const buttons = document.querySelectorAll(".tabBtn");

//     buttons.forEach((btn) => {
//         btn.classList.remove("active");
//     });

//     if (tab === "more") {
//         moreTab.classList.add("active");
//         statsTab.classList.remove("active");

//         buttons[0].classList.add("active");
//     } else {
//         statsTab.classList.add("active");
//         moreTab.classList.remove("active");

//         buttons[1].classList.add("active");
//     }
// }

// window.showTab = showTab;
// window.closeOverlay = closeOverlay;

function showTab(tab) {
    const moreTab = document.getElementById("moreTab");
    const statsTab = document.getElementById("statsTab");

    const buttons = document.querySelectorAll(".tabBtn");

    // alle Buttons resetten
    buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === tab);
    });

    // Tabs anzeigen/verstecken
    if (tab === "more") {
        moreTab.classList.add("active");
        statsTab.classList.remove("active");
    }

    if (tab === "stats") {
        statsTab.classList.add("active");
        moreTab.classList.remove("active");
    }
}

overlayContainer.addEventListener("click", (event) => {
    const target = event.target;

    // Close overlay on background-click
    if (target === overlayContainer) {
        closeOverlay();
        return;
    }

    // Nav buttons and close-overlay buttons
    const navBtn = target.closest("[data-action]");
    if (navBtn) {
        const action = navBtn.dataset.action;

        if (action === "prev") showPreviousPokemon();
        if (action === "next") showNextPokemon();
        if (action === "close") closeOverlay();

        return;
    }

    // Tabs in overlay
    const tabBtn = target.closest("[data-tab]");
    if (tabBtn) {
        showTab(tabBtn.dataset.tab);
        return;
    }
});

const searchField = document.getElementById("searchFieldID");
const searchBtn = document.getElementById("btnSearchID");
searchBtn.addEventListener("click", () => {
    handleSearch();
});
searchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});


const searchError = document.getElementById("searchErrorID");


function handleSearch() {
    const value = searchField.value.toLowerCase().trim();
    searchError.style.display = "none";
    searchError.textContent = "";

    // // Suchfeld leer -> alles anzeigen
    // if (value === "") {
    //     resetSearch();
    //     return;
    // }

    // Zu kurz
    if (value.length < 3) {
        searchError.style.display = "flex";
        searchError.textContent =
            "Please enter at least 3 letters.";
        return;
    }

    const results = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value)
    );

    if (results.length === 0) {
        pokedex.innerHTML = "";
        searchError.style.display = "flex";
        btnResetSearch.style.display = "flex";
        btnLoadMore.style.display = "none";
        searchError.textContent =
            "No Pokémon found.";
        return;
    }

    applySearch(results);
}
// const btnLoadMore = document.getElementById("btnLoadMoreID");

const btnResetSearch = document.getElementById("btnResetSearchID");

btnResetSearch.addEventListener("click", () => {
    resetSearch();
});

function applySearch(results) {
    currentList = results; // 👈 WICHTIG: Navigation nur diese Liste

    pokedex.innerHTML = ""; // Grid leeren
    renderPokemonCards(results);

    btnResetSearch.style.display = "flex";

    btnLoadMore.style.display = "none";

    currentIndex = 0; // Overlay Navigation reset
}

function resetSearch() {
    currentList = [...allPokemon];

    pokedex.innerHTML = "";
    renderPokemonCards(allPokemon);

    btnResetSearch.style.display = "none";
    btnLoadMore.style.display = "flex";
    searchError.style.display = "none";

    searchField.value = "";

    currentIndex = 0;
}


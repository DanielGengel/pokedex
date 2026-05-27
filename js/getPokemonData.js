const pokemonCache = {};
// const evolutionCache = {};
const pokemonLimit = 20;
let offset = 0;

const pokedex = document.getElementById("pokedexGridID");
const overlayContainer = document.getElementById("overlayContainer");

pokedex.addEventListener("click", (event) => {
    const card = event.target.closest(".pokemonCard");

    if (!card) return;

    const id = card.dataset.id;

    openPokemonOverlay(id);
});



export async function loadAndRenderPokemon() {
    showLoader(true);
    const pokemonList = await loadPokemonList();
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
    return data;

    
}

function renderPokemonCards(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        //const pokedex = document.getElementById("pokedexGridID");
        pokedex.innerHTML += createPokemonCard(pokemon);
    }
}






// official-artwork // dream_world


function createPokemonCard(pokemon) {

    let typesHTML = "";


    for (let i = 0; i < pokemon.types.length; i++) {

        const type = pokemon.types[i].type.name;

        typesHTML += `
            <div class="type ${type}">
                ${type}
            </div>
        `;
    }

    return `
        <div class="pokemonCard ${pokemon.types[0].type.name}" data-id="${pokemon.id}">

            <img
                class="pokemonImage"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
            >

            <p class="pokemonNumber">
                #${pokemon.id}
            </p>

            <h2 class="pokemonName">
                ${pokemon.name}
            </h2>

            <div class="pokemonInfo">

                <div>
                    Height: ${pokemon.height}
                </div>

                <div>
                    Weight: ${pokemon.weight}
                </div>

            </div>

            <div class="types">
                ${typesHTML}
            </div>

        </div>
    `;
}

const btnLoadMore = document.getElementById("btnLoadMoreID");
btnLoadMore.addEventListener("click", async () => {
    offset += pokemonLimit;

    await loadAndRenderPokemon();
});

function showLoader(state) {
    if (state) {
        loader.classList.remove("hidden");
        btnLoadMore.disabled = true;
    } else {
        loader.classList.add("hidden");
        btnLoadMore.disabled = false;
    }
}

async function loadNextPage() {
    offset += pokemonLimit;

    loadAndRenderPokemon();
}







async function openPokemonOverlay(id) {
    showLoader(true);

    let pokemon = null;

    // Cache suchen
    for (let key in pokemonCache) {
        if (pokemonCache[key].id == id) {
            console.log("Pokemon from cache");
            pokemon = pokemonCache[key];
            break;
        }
    }

    // falls nicht im Cache
    if (!pokemon) {
        console.log("Pokemon NOT from cache");
        
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        pokemon = await loadPokemonDetails(url);
    }

    overlayContainer.innerHTML = createOverlayHTML(pokemon);
    overlayContainer.classList.add("active");

    showLoader(false);
}





overlayContainer.addEventListener("click", (event) => {
    if (event.target.id === "overlayContainer") {
        closeOverlay();
    }
});

function closeOverlay() {
    overlayContainer.classList.remove("active");
    overlayContainer.innerHTML = "";
}




// function createOverlayHTML(pokemon) {

//     let typesHTML = "";

//     for (let i = 0; i < pokemon.types.length; i++) {
//         const type = pokemon.types[i].type.name;

//         typesHTML += `
//             <div class="type ${type}">
//                 ${type}
//             </div>
//         `;
//     }

//     let abilitiesHTML = "";

// for (let i = 0; i < pokemon.abilities.length; i++) {
//     abilitiesHTML += `
//         <div>
//             ${pokemon.abilities[i].ability.name}
//         </div>
//     `;
// }


// let statsHTML = "";

// for (let i = 0; i < pokemon.stats.length; i++) {
//     const stat = pokemon.stats[i];

//     statsHTML += `
//         <div>
//             ${stat.stat.name}: ${stat.base_stat}
//         </div>
//     `;
// }

//     return `
//     <div class="overlayBackground" id="overlayBackground">
//         <div class="overlayCard ${pokemon.types[0].type.name}">

//             <button onclick="closeOverlay()" class="closeBtn">X</button>

//             <img
//                 class="pokemonImage"
//                 src="${pokemon.sprites.other["official-artwork"].front_default}"
//             >

//             <p class="pokemonNumber">#${pokemon.id}</p>

//             <h2 class="pokemonName">${pokemon.name}</h2>

//             <div class="pokemonInfo">
//                 <div>Height: ${pokemon.height}</div>
//                 <div>Weight: ${pokemon.weight}</div>
//             </div>

//             <h3>Abilities</h3>
//             <div class="abilities">
//                 ${abilitiesHTML}
//             </div>

//             <h3>Stats</h3>
//             <div class="stats">
//                 ${statsHTML}
//             </div>

//             <div class="types">
//                 ${typesHTML}
//             </div>

//         </div>
//     </div>
// `;
// }



function createOverlayHTML(pokemon) {

    let typesHTML = "";

    for (let i = 0; i < pokemon.types.length; i++) {
        const type = pokemon.types[i].type.name;

        typesHTML += `
            <div class="type ${type}">
                ${type}
            </div>
        `;
    }

    let abilitiesHTML = "";

    for (let i = 0; i < pokemon.abilities.length; i++) {
        abilitiesHTML += `
           
                ${pokemon.abilities[i].ability.name}
                ${i < pokemon.abilities.length - 1 ? "," : ""}
          
        `;
    }

    let statsHTML = "";

    for (let i = 0; i < pokemon.stats.length; i++) {

        const stat = pokemon.stats[i];

         const statPercent = (stat.base_stat / 255) * 100;


        statsHTML += `
    <div class="statRow">

        <div class="statName">
            ${stat.stat.name}
        </div>

        <div class="statBarContainer">

            <div 
                class="statBar ${pokemon.types[0].type.name}"
                style="width: ${statPercent}%"
            >
                ${stat.base_stat}
            </div>

        </div>

    </div>
`;
    }

    return `
    <div class="overlayBackground ${pokemon.types[0].type.name}">

    <div class="overlayCard ${pokemon.types[0].type.name}">

        <button onclick="closeOverlay()" class="closeBtn">
            X
        </button>

        <img
            class="pokemonImage"
            src="${pokemon.sprites.other["official-artwork"].front_default}"
        >

        <p class="pokemonNumber">
            #${pokemon.id}
        </p>

        <h2 class="pokemonName">
            ${pokemon.name}
        </h2>

        <div class="types">
            ${typesHTML}
        </div>

        <div class="overlayTabs">

            <button 
                class="tabBtn ${pokemon.types[0].type.name} active"
                onclick="showTab('more')"
            >
                MORE
            </button>

            <button 
                class="tabBtn ${pokemon.types[0].type.name}"
                onclick="showTab('stats')"
            >
                STATS
            </button>

        </div>

            <div id="moreTab" class="tabContent active">

                <div class="pokemonInfo">
                    <div>Height: ${pokemon.height}</div>
                    <div>Weight: ${pokemon.weight}</div>
                </div>

                <div class="abilities"><h3>Abilities: ${abilitiesHTML}</h3></div>

               

            </div>

            <div id="statsTab" class="tabContent">

                <div class="stats">
                    ${statsHTML}
                </div>

            </div>

        </div>

    </div>
    `;
}


function showTab(tab) {

    const moreTab = document.getElementById("moreTab");
    const statsTab = document.getElementById("statsTab");

    const buttons = document.querySelectorAll(".tabBtn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    if (tab === "more") {

        moreTab.classList.add("active");
        statsTab.classList.remove("active");

        buttons[0].classList.add("active");

    } else {

        statsTab.classList.add("active");
        moreTab.classList.remove("active");

        buttons[1].classList.add("active");
    }
}

window.showTab = showTab;
window.closeOverlay = closeOverlay;
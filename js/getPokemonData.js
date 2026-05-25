const pokemonCache = {};
// const evolutionCache = {};
const pokemonLimit = 20;
let offset = 0;

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

    console.log(data);
    

    pokemonCache[url] = data;

    return data;

    
}

/*
========================
RENDER POKEMON
========================
*/

function renderPokemonCards(pokemonList) {
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        const pokedex = document.getElementById("pokedexGridID");
        pokedex.innerHTML += createPokemonCard(pokemon);
    }
}

/*
official-artwork // dream_world
*/

// function createPokemonCard(pokemon) {
//      const type = pokemon.types[0].type.name;
    
//     return `
//         <div class="pokemonCard ${type}" data-id="${pokemon.id}">

//             <img
//                 class="pokemonImage"
//                 src="${pokemon.sprites.other["dream_world"].front_default}"
//             >
// <p class="pokemonNumber">#${pokemon.id}</p>
//             <h2 class="pokemonName">${pokemon.name}</h2>

//             <div class="types">
//                         <div class=${pokemon.type}>${pokemon.height}m</div>
//                         <div class="type flying">${pokemon.weight}kg</div>
//                         <div class="type---">${type}</div>
//                     </div>

//         </div>
//     `;
// }



/*
official-artwork // dream_world
*/


function createPokemonCard(pokemon) {

    let typesHTML = "";

    /*
        Alle Typen durchlaufen
    */

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

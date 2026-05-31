
export function templateCardBackgroundColor(pokemon) {
    // The first pokemon-type is used for the background color e.g. water=blue, fire=red
    // End-div for this element will be added ad the end of the html-templates => function templateEndDiv() 
    return `<div class="pokemonCard ${pokemon.types[0].type.name}" data-id="${pokemon.id}">`;
}

export function templatePokemonID(pokemon) {
    return `<p class="pokemonNumber">#${pokemon.id}</p>`;
}

export function templatePokemonImage(pokemon) {
    // official-artwork // dream_world
    return `<img class="pokemonImage" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Image of ${pokemon.name}">`;
}

export function templatePokemonName(pokemon) {
    return `<h2 class="pokemonName">${pokemon.name}</h2>`;
}

export function templatePokemonHeightWeight(pokemon) {
    return `<div class="pokemonInfo"><div>Height: ${pokemon.height}m | Weight: ${pokemon.weight}kg</div></div>`;
}

export function templatePokemonTypes() {
    // Start element for pokemon types. Pokemons can have more than one type, therfore the next
    // template can be called more than once in a loop => function templatePokemonType(type)
    // The end-div for this element will be added after templatePokemonType(type)
    return `<div class="types">`;
}

export function templatePokemonType(type) {
    // template can be called more than once in a loop => function templatePokemonType(type)
    return `<div class="type ${type}">${type}</div>`;
}

export function templateEndDiv() {
    return `</div>`;
}

export function templateOverlayBackgroundColor(pokemon) {
    // The first pokemon-type is used for the background color e.g. water=blue, fire=red
    // End-div for this element will be added ad the end of the html-templates => function templateEndDiv() 
    return `<div class="overlayBackground ${pokemon.types[0].type.name}">`;
}

export function templateOverlayCardColor(pokemon) {
    // The first pokemon-type is used for the color e.g. water=blue, fire=red
    // End-div for this element will be added ad the end of the html-templates => function templateEndDiv() 
    return `<div class="overlayCard ${pokemon.types[0].type.name}">`;
}

export function templateCloseButton() {
    return `<button class="closeBtn" data-action="close">X</button>`;
}

export function templateNavPrevButton() {
    // The end-div for pokemonNavigation will be added with the next-button
    return `<div class="pokemonNavigation"><button class="navBtn" data-action="prev">◀</button>`;
}

export function templateNavNextButton() {
      // The end-div is for pokemonNavigation added with the prev-button
    return `<button class="navBtn" data-action="next">▶</button></div>`;
}

export function templateOverlayTabs() {
    return `
    <div class="overlayTabs">
        <button class="tabBtn active" data-tab="more">INFO</button>
        <button class="tabBtn" data-tab="stats">STATS</button>
    </div>`;
}

export function templateMoreTab() {
    // The end-div for the moreTab will be added with the templateStatsTab, because content is
    // injected right after templateMoreTab. 
    return `<div id="moreTab" class="tabContent active">`;
}

export function templateStatsTab() {
    // The end-div is for the moreTab. The end-div for templateStatsTab will be added after
    // templatePokemonStats(stat, statPercent) with templateEndDiv()
    return `</div><div id="statsTab" class="tabContent"><div class="stats">`;
}

export function templatePokemonStats(stat, statPercent) {
    return `
    <div class="statRow">
        <div class="statName">
            ${stat.stat.name}
        </div>
        <div class="statBarContainer">
            <div class="statBar" style="width: ${statPercent}%">
                ${stat.base_stat}
            </div>
        </div>
    </div>`;
}




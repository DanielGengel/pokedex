

export function templateCardBackgroundColor(pokemon) {
    // the first type equals the background color e.g. water=blue, fire=red
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
    return `<div class="types">`;
}

export function templatePokemonType(type) {
    return `<div class="type ${type}">${type}</div>`;
}

export function templateEndDiv() {
    return `</div></div>`;
}

export function templateOverlayBackgrouundColor(pokemon) {
    return `<div class="overlayBackground ${pokemon.types[0].type.name}">`;
}

export function templateOverlayCardColor(pokemon) {
    return `<div class="overlayCard ${pokemon.types[0].type.name}">`;
}

export function templateCloseButton() {
    return `<button class="closeBtn" data-action="close">X</button>`;
}

export function templateNavPrevButton() {
    return `<div class="pokemonNavigation"><button class="navBtn" data-action="prev">◀</button>`;
}

export function templateNavNextButton() {
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
    return `<div id="moreTab" class="tabContent active">`;
}

export function templateStatsTab() {
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




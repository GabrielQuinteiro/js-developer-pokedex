const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="card-pokemon">
		<div class="pokemon ${pokemon.type}">
			<div class="wm-pokeball">
                <img class="img-wm" alt="Pokeball Watermark" src="/src/assets/wm.png">
            </div>
			<span class="number">#${pokemon.number}</span>

			<div class="name">
				<h2>
					${pokemon.name}
				</h2>

				<div class="types">
					${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
				</div>
			</div>

			<div class="pokemon-image">
				<img class="img-pokemon" alt=${pokemon.name} src="${pokemon.photo}"/>
			</div>

		</div>
    </div>    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="card-pokemon">
		<div class="pokemon ${pokemon.type}">
			<div class="bg-pokeball"></div>
			<span class="number">#${pokemon.number}</span>

			<div class="name">
				<h2>
					${pokemon.name}
				</h2>

				<ol class="types">
					${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
				</ol>
			</div>

			<div class="pokemon-image">
				<img alt=${pokemon.name} src="${pokemon.photo}"/>
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
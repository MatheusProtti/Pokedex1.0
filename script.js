const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_numbers')
const pokemonImage = document.querySelector('.pokemon_image')
const searchForPokemon = document.querySelector('.inputSearch')
const buttonPrev = document.querySelector('#butonPrev')
const butonNext = document.querySelector('#butonNext') 
const form = document.querySelector('.form')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200) {
        const data = await apiResponse.json()
        return data
    }

}

const renderPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if(data) {

        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        document.querySelector('.inputSearch').value = ""
        searchPokemon = data.id 

    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found'
        pokemonNumber.innerHTML = ''
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault()

    renderPokemon(document.querySelector('.inputSearch').value.toLowerCase())
    // renderPokemon(input.value) desse modo não deu certo.

});

buttonPrev.addEventListener('click', () => {

    if(searchPokemon > 1){
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

butonNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

})

renderPokemon(searchPokemon)

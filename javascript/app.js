const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, height, moves, stats, weight }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const showTypes = types.map(typeInfo => typeInfo.type.name).join(' | ')
    const pokemonId = ("000" + id).substr(-3)

    accumulator += `
    <li onclick="searchT_pokemon(this)" class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"</img>
        <h2 class="card-title">${name}</h2>
        <h4 class="pokemon-id">#${pokemonId}</h4>
        <div id="extraInfo" style="display:none" class="card-subtitle">
        <h5>#${showTypes}</h5>
        <h5>#${height}</h5>
        <h5>#${weight}</h5>
        </div>
      </li>
    `
    return accumulator
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

function search_pokemon() {
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let x = document.getElementsByTagName('li');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {
        x[i].style.display="list-item";              
      }
  }
}

function searchT_pokemon(name) {
  let pokemonName = name.querySelector('.card-title').innerHTML;
  let x = document.getElementsByTagName('li');
    
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(pokemonName)) {
          x[i].style.display="none";
      }
      else {
        console.log(x[i].getElementsByTagName('div'))
        x[i].getElementsByTagName('div').style.display = "block";
        x[i].style.display="list-item";          
      }
  }
}

sortByName = () => {
  let list, i, switching, b, shouldSwitch;
  list = document.querySelector('[data-js="pokedex"]')
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("li");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
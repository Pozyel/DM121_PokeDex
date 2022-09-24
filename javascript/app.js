const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types, height, abilities, stats, weight }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const showTypes = types.map(typeInfo => typeInfo.type.name).join(' | ')
    const elementAbilities = abilities.map(abilitieInfo => abilitieInfo.ability.name).join(' | ')
    const pokemonId = ("000" + id).substr(-3)

    accumulator += `
    <li onclick="searchT_pokemon(this)" class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"</img>
        <h2 class="card-title">${name}</h2>
        <h4 class="pokemon-id">#${pokemonId}</h4>
        <button class="card-button-left">${name}</button>
        <button class="card-button-top-left">${name}</button>
        <div id="extraInfo" style="display:none" class="card-subtitle">
        <button onclick=" next(${id})">Next</button>
        <h5>#${showTypes}</h5>
        <h5>#${height}</h5>
        <h5>#${weight}</h5>
        <h5>#${elementAbilities}</h5>
        <label for="hp">HP:${stats[0].base_stat}</label>
        <progress id="hp" value="${stats[0].base_stat}" max="100"></progress>
        <label for="atk">ATK:${stats[1].base_stat}</label>
        <progress id="atk" value="${stats[1].base_stat}" max="100"></progress>
        <label for="def">DEF:${stats[2].base_stat}</label>
        <progress id="def" value="${stats[2].base_stat}" max="100"></progress>
        <label for="satk">SATK:${stats[3].base_stat}</label>
        <progress id="satk" value="${stats[3].base_stat}" max="100"></progress>
        <label for="sdef">SDEF:${stats[4].base_stat}</label>
        <progress id="sdef" value="${stats[4].base_stat}" max="100"></progress>
        <label for="spd">SPD:${stats[5].base_stat}</label>
        <progress id="spd" value="${stats[5].base_stat}" max="100"></progress>

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
        x[i].getElementsByTagName('div')[0].style.display = "block";
        x[i].style.display="list-item";
        x[i].onclick = null;          
      }
  }
}
function next(id) {
  let x = document.getElementsByTagName('li');
  console.log(id);
  if (id !== 150) {
    x[id-1].style.display="none";
    x[id].style.display="list-item";
    x[id].getElementsByTagName('div')[0].style.display = "block";
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
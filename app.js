const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatorPokemonPromises = () => Array(150).fill().map((_, index) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetch(getPokemonUrl(index + 1)).then((response) => response.json()));

const generateHTML = (pokemons) => pokemons.reduce((acc, { name, id, types }) => {
  const ElementTypes = types.map((typeInfo) => typeInfo.type.name);
  // eslint-disable-next-line no-param-reassign
  acc += `
      <li class="card" ${ElementTypes[0]}>
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="sub-title">${types.join(' | ')}</P>
      </li>
    `;
  return acc;
}, '');

const insertPokemonIntiPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');

  ul.innerHTML = pokemons;
};

const pokemonPromises = generatorPokemonPromises();

Promise.all(pokemonPromises)
  .then(generateHTML)

  .then(insertPokemonIntiPage);

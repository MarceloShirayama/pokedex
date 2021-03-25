/* eslint-disable no-console */
const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemonPromises = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 150; i++) {
    pokemonPromises.push(fetch(getPokemonUrl(i)).then((response) => response.json()));
  }

  Promise.all(pokemonPromises)
    .then((pokemons) => {
      // console.log(pokemons);

      const lisPokemons = pokemons.reduce((acc, pokemon) => {
        const types = pokemon.types.map((typeInfo) => typeInfo.type.name)
        // eslint-disable-next-line no-param-reassign
        acc += `
          <li class="card">
            <img class="card-image" ${types[0]} alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="sub-title">${types.join(' | ')}</P>
          </li>
        `;
        return acc;
      }, '');

      console.log(lisPokemons);
    });
};

fetchPokemon();

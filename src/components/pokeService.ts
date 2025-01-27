import { getConfig } from '@open-cells/core';

const {
  appConfig: {
    recipesService: { basePath = undefined, actions = undefined } = {},
  } = {},
} = getConfig();

function getFetchUrl(action: string, param?: string, paramValue?: string): URL {

  const data = new URL(`${basePath}/${action}`)
  if (param && paramValue) {
    data.searchParams.set(param, paramValue);
  }
  console.log(`Constructed URL: ${data.toString()}`);
  return data;
}

async function fetchPokemon(
  action: keyof typeof actions,
  param?: string,
  paramValue?: string,
): Promise<any> {
  const data = await fetch(getFetchUrl(actions[action], param, paramValue));
  return data.json();
}

// Pokemon
export const getPokemonByName = async (pokeName: string) => fetchPokemon('pokemon', 's', pokeName );
export const getAllPokemons = async () => fetchPokemon('pokemon');
export const getPokemonById = async (id: string) => fetchPokemon('pokemon', 'i', id);



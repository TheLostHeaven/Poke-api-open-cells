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

function getFetchUrl2(action: string , param?: string, paramValue?: string){
  const data = new URL(`https://pokeapi.co/api/v2/${action}`);
  if (param && paramValue) {
      data.searchParams.set(param, paramValue);
    }
    return data;
}

async function fetchData(action: string , param?: string, paramValue?: string): Promise<any> {
  console.log(`fetching data from ${getFetchUrl2(action, param, paramValue)}`);
  const data = await fetch(getFetchUrl(action, param, paramValue));
  return data.json();

}

async function fetchPokemon(
  action: keyof typeof actions,
  param?: string,
  paramValue?: string,
): Promise<any> {
  const data = await fetch(getFetchUrl(actions[action], param, paramValue));
  return data.json();
}

export const getAllPokemons = async (limit?: number) => {
  let pokemonList;
  pokemonList = fetchPokemon(`pokemon`, 'limit', limit?.toString());
  return pokemonList;
};

export const getPokemon = async (id: number) => fetchData(`pokemon/${id}`);;

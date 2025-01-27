type  Pokemon ={
  id: number,
  name: string,
  image: string,
  types: types[],
  hp: number,
  attack: number,
  defense: number,
  speed: number,
  abilities: abilities[],
  sprites: Sprites,
  weight: number
}

type Sprites = {
  front_default: string,
}

type abilities ={
  ability: {
    name: string,
    url: string
  }
}

type types = {
  type:{
    name: string,
  }
}

 type PokemonList ={
  map(arg0: (item: any) => import("lit-html").TemplateResult<1>): unknown;
  count: number;
  next: string;
  previous: string;
  results: PokemonReturn[];
}

type PokemonReturn = {
  name: string;
  url: string;
}

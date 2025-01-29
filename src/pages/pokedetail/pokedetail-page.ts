import { html, LitElement } from "lit";
import { PageController } from "@open-cells/page-controller";
import { customElement, property } from "lit/decorators.js";
import { getPokemon } from "../../components/pokeService.js";

@customElement("pokedetail-page")
export class PokeDetailPage extends LitElement {

  pageController = new PageController(this);

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
  constructor() {
    super();
    this.onPageEnter();
  }

  @property({ type: Object }) params: { id?: string } = {};
  originalPokemons: Pokemon[] = [];
  @property({ type: Boolean }) _isPokemon: boolean = false;


  @property({ type: Object }) pokemon: Pokemon | null = null;
  @property({ type: Object }) _abilities: abilities[] | null = null;
  @property({ type: Object }) _pokemonInfo: any = {};


  async getPokenmonInfo() {
    if (this.pokemon && this.pokemon.id !== undefined) {
        const response = await getPokemon(this.pokemon.id);
        return response.results;
    }
    return [];
}

async  firstUpdated() {
    await this._pokemonInfo();
    this.getPokenmonInfo().then(_pokemonInfo => this._abilities = _pokemonInfo);
  }

  async onPageEnter() {

    console.log(this.params.id);
                if (this.params.id !== undefined) {
                    this.pageController.publish(`ch-pokemon${this.params.id}`, await getPokemon(Number(this.params.id)));
                }
    if(Object.keys(this._pokemonInfo).length === 0){

            if (this.params.id !== undefined) {
                this.pageController.publish(`ch-pokemon${this.params.id}`, await getPokemon(Number(this.params.id)));
            }

    }

    this.pageController.subscribe(`ch-pokemon${this.params.id}`, (data: any)=>{
        this._pokemonInfo = data;
    });
    console.log(this._pokemonInfo.abilities?.map((ability: any) => ability.ability.name));

    this._isPokemon = true;


}
  render() {
    this.requestUpdate();
    console.log(this._isPokemon);
    console.log(this._pokemonInfo);
    if (this._isPokemon === true) {
    return html`
    <div class="pokemon-container">
    ${(this._pokemonInfo) && this._pokemonInfo.forms ?
            this._pokemonInfo.forms.map((form: any) => html`
                <h1> ${form.name}
                </h1>
            `) :
            html`<h1>Pokemon page</h1>`
        }


      <h3>abilities</h3>
      <ul class="pokemon-content-container">
        ${(this._pokemonInfo) && this._pokemonInfo.abilities ?
            this._pokemonInfo?.abilities?.map((ability: any) => html`
                <li> ${ability.ability.name}
                </li>
            `) :
            html`<li>No Pokémon found</li>`
        }
        </ul>
      <h3>base experience</h3>

        ${(this._pokemonInfo) && this._pokemonInfo.base_experience ?
            html`<div class="pokemon-content-container"> ${this._pokemonInfo.base_experience} </div>` :
            html`<li>No Pokémon found</li>`
        }
      <h3>moves</h3>
        <div class="pokemon-moves-container">
        <ul class="pokemon-moves-container">
            ${(this._pokemonInfo) && this._pokemonInfo.moves ?
                this._pokemonInfo.moves.map((move: any) => html`
                    <li> <div class="pokemon-moves"> ${move.move.name} </div>
                    </li>
                `) :
                html`<li>No Pokémon found</li>`
            }
        </ul>
        </div>
      </div>
    `;
  } return html`<h1>Loading...</h1>`;

}
}

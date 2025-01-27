import { html, LitElement } from "lit";
import { PageController } from "@open-cells/page-controller";
import { customElement, state } from "lit/decorators.js";
import { getPokemonById } from "../../components/pokeService.js";

@customElement("pokedetail-page")
export class PokeDetailPage extends LitElement {
  pageController = new PageController(this);

  originalPokemons: Pokemon[] = []
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  @state()
    protected _pokemonsId:Pokemon | null = null;

    async connectedCallback(){

      try {
        const pokemonId = await getPokemonById(this.id);
        console.log(pokemonId);
        this._pokemonsId = pokemonId;
      } catch (error) {
        console.error(error);
      }
    }


  render() {
    return html`
    <h1>PokeDetail</h1>
    `;
  }
}

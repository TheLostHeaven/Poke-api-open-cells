import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageLayout } from '../../components/page-layout.js';
import '../../components/page-layout.js';
import { getAllPokemons } from '../../components/pokeService.js';


@customElement('home-page')
export class HomePage extends LitElement {

  private _layout: PageLayout | null = null;
  pokemonList!: PokemonList[];
  originalPokemons: Pokemon[] = []
  filteredPokemons: Pokemon[] = []

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  @state()
  protected _pokemons:Pokemon | null = null;
  protected _pokemonsList:PokemonList | null = null;
  protected _pokemonsFilter:PokemonReturn | null = null;

  async connectedCallback() {
    '';
    super.connectedCallback();
    try {
      const pokemonList = await getAllPokemons();
      console.log(pokemonList);
      this._pokemonsList = pokemonList;
    }catch (error) {
      console.error(error);
    }
  }


  render() {
    return html`
      <div class="img-container">
        <img
          src="${this._pokemons?.image || ''}"
          alt="${this._pokemons?.name || ''}"
        />
      </div>

              <div class="ingredients-list">
          <h3>Ingredients</h3>
          <ul>
            ${this._pokemonsList
              ? Object.keys(this._pokemonsList)
                  .filter(
                    (key: string) =>
                      // @ts-ignore
                      key.includes('strIngredient') && this._recipe && this._recipe[key],
                  )
                  .map(
                    key => html`
                      <li>
                        <p>${this._pokemons ? (this._pokemons as any)[key] : nothing}</p>
                        <p>
                          ${this._pokemons
                            ? (this._pokemons as any)[`strMeasure${key.split('strIngredient')[1]}`]
                            : nothing}
                        </p>
                      </li>
                    `,
                  )
              : nothing}
          </ul>

            <div class="banner-text">
        <div class="banner-text-heading">
          <p class="heading-h3">Daily Special</p>
          <a
            class="poke-title"
            href="#!/pokedetail/${this._pokemons?.id}"
            >${this._pokemons?.name}</a
          >
        </div>
    `;
  }

}

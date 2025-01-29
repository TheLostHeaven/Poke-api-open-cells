import { html, LitElement,  } from 'lit';
import { customElement,property, state } from 'lit/decorators.js';
import '../../components/page-layout.js';
import { getAllPokemons } from '../../components/pokeService.js';
import { PageController } from '@open-cells/page-controller';
import '../../components/poke-card.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  @property({ type: Number })
    currentPage = 1;

  @property({ type: Number })
    totalItems = 1300;

  @property({ type: Number })
    itemsPerPage = 60;

  @property()
    selectedType: String = "";

  @state()
  _pokemons:Pokemon[] | null = null;
  @state()
  _pokemonsList:PokemonList[] | null = null;
  @state()
  _pokemonsFilter:PokemonList[] | null = null;

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  async _getPokemons() {
    const response = await getAllPokemons(1300);
    return response.results;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.dispatchEvent(new CustomEvent('page-changed', { detail: { page } }));
  }

  firstUpdated() {
    this._getPokemons().then(_pokemonList => {
      this._pokemonsList = _pokemonList;
      this._pokemonsFilter = _pokemonList;
      this.totalItems = _pokemonList.length;
    });
  }

  handleSearch(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    if (this._pokemonsList) {
      if (searchQuery === '') {
        this._pokemonsFilter = this._pokemonsList;
      } else {
        this._pokemonsFilter = this._pokemonsList.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(searchQuery)
        );
      }
    }
  }

  handleCardClick(pokemon: any) {
    this.pageController.navigate(`/pokedetail/${pokemon.id}`);
  }

  render() {
    return html`
      <div class="home">
        <div class="search">
          <input type="text" placeholder="Search Pokémon" @input="${this.handleSearch}" />
        </div>
        <ul class="pagination">
          ${(Array.isArray(this._pokemonsFilter) && this._pokemonsFilter.length > 0) ?
            this._pokemonsFilter.map((pokemon, index:number) => html`
              <li @click="${() => {this.pageController.navigate('pokedetail', {id: index+1})}}">
                <poke-card .pokemon="${pokemon}"></poke-card>
              </li>
            `) :
            html`<li>No Pokémon found</li>`
          }
        </ul>
      </div>
    `;
  }
}

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';


//@ts-ignore
@customElement('header-component')
export class HeaderComponent extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

render() {
    return html`
      <header>
        <div class="header-content">
          <div class="header-logo">
            <img src="../../images/favicon.svg" alt="Poke-Api" height=100 width=100 />
            <h1><a href="#!/">Poke-Api</a></h1>
            </div>
        </div>
      </header>
    `;
}
}

import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import { appConfig } from '../config/app.config.js';
import './header-component';


startApp({
  routes,
  mainNode: 'app-content',
  appConfig,
  viewLimit: 2,

});
@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);
  static styles = styles;

  connectedCallback() {
    super.connectedCallback();

  }


  render() {
    return html`
    <header-component></header-component>
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
    `;
  }
}

// /*
//  * Copyright 2024 Bilbao Vizcaya Argentaria, S.A.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
import { css } from 'lit';

export const styles = css`
  :host {
    /* icon-button */
    --md-outlined-icon-button-hover-state-layer-color: var(--surface-container-highest);
    --md-outlined-icon-button-pressed-state-layer-color: var(--surface-container-highest);
    --md-outlined-icon-button-hover-state-layer-opacity: 0.3;

    --md-outlined-icon-button-outline-color: var(--outline);
    --md-outlined-icon-button-pressed-outline-color: var(--on-surface-variant);

    --md-outlined-icon-button-icon-color: var(--primary);
    --md-outlined-icon-button-focus-icon-color: var(--on-surface-variant);
    --md-outlined-icon-button-hover-icon-color: var(--on-surface-variant);
    --md-outlined-icon-button-pressed-icon-color: var(--on-surface-variant);

    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  header {
    width: 100%;
    background-color: var(--surface);
    color: var(--primary);
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 1rem 0;
  }

  .header-content::after {
    content: '';
    width: 100%;
    height: 2.75rem;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, var(--header-gradient) 100%);
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    z-index: 1;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    
  }

  h1 {
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 300;
  }

  a {
    text-decoration: none;
    color: var(--primary);
  }

  main {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  main ::slotted(*) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--surface);
  }

  /* 1024px */
  @media (min-width: 64rem) {
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 58rem;
      height: 8rem;
      margin: 0 auto;
      will-change: height;
      transition: height 0.1s ease-in-out;
    }
    header.scrolled {
      height: 5rem;
    }
  }

  /* 1440px */
  @media (min-width: 90rem) {
    header {
      max-width: 71.5rem;
    }
  }

  /* DARK MODE */
  /* @media (prefers-color-scheme: dark) {
    :host {
      --primary-dark: #E2C46D;
      --on-surface-dark: #EAE2D4;
      --on-surface-variant-dark: #CFC6B4;
      --surface-container-dark: #2D2A21;
      --surface-container-high-dark: #2D2A21;
      --surface-container-highest-dark: #38342B;
      --surface-dark: #16130B;
      --outline-dark: #989080;
    }
  } */

  :root[color-scheme-dark] {
    --primary-dark: #e2c46d;
    --on-surface-dark: #eae2d4;
    --on-surface-variant-dark: #cfc6b4;
    --surface-container-dark: #2d2a21;
    --surface-container-high-dark: #2d2a21;
    --surface-container-highest-dark: #38342b;
    --surface-dark: #16130b;
    --outline-dark: #989080;
    --header-gradient-dark: rgba(22, 19, 11, 1);
  }
`;

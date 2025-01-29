import { RouteDefinition } from '@open-cells/core/types';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/pokedetail/:id',
    name: 'pokedetail',
    component: 'pokedetail-page',
    action: async () => {
      await import('../pages/pokedetail/pokedetail-page.js');
  }
},
];

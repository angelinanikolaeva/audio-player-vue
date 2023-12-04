import { createApp } from 'vue';

import App from './app/App.vue';

import '@/app/styles/index.scss';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './app/providers/router';

const router = createRouter({
  routes,
  history: createWebHistory('/audio-player-vue/'),
});

const app = createApp(App);
app.use(router);
app.mount('#app');

/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Register the persistedstate plugin
pinia.use(piniaPluginPersistedstate);

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}

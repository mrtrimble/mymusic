// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', '@nuxtjs/google-fonts'],
  css: ['@acab/reset.css', '~/assets/css/main.scss'],
  buildModules: [],
  preset: 'netlify-edge',
  env: {
    discogKey: process.env.DISCOG_KEY,
    discogSecret: process.env.DISCOG_SECRET,
  },
  googleFonts: {
    families: {
      'Josefin+Sans': [400, 600, 900],
      Figtree: [400, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },
});

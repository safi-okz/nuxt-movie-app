// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    head: {
        title: 'movie app',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8'},
            { name: 'viewport', content: 'width=device-width, initial-sacle=1'},
            { hid: 'description', name: 'description', content: ''},
            { name: 'format-detection', content: 'telephone=no'}
        ],
    },
    css: [
        '@/assets/default.scss'
    ],
    modules: ['@pinia/nuxt'],
})

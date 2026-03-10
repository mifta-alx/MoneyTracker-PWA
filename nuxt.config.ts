export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        '@vite-pwa/nuxt'
    ],

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Money Tracker Pro',
            short_name: 'MoneyApp',
            theme_color: '#10b981',
            display: 'standalone',
            background_color: '#ffffff',
            icons: [
                {
                    src: 'icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'], // Cache file statis
        },
        client: {
            installPrompt: true, // Munculkan prompt install
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            type: 'module',
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    },

    // Konfigurasi Supabase
    supabase: {
        redirect: false
    }
})
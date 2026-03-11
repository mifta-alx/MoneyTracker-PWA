import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    ssr: true,
    css: ["./app/assets/css/main.css"],
  compatibilityDate: '2025-07-15',
  experimental: {
        payloadExtraction: false
    },
  devtools: { enabled: false },
    modules: [
        "@nuxt/icon",
        '@nuxtjs/supabase',
        '@vite-pwa/nuxt',
        '@nuxtjs/google-fonts',
    ],
    vite: {
        plugins: [tailwindcss()],
        // optimizeDeps: {
        //     include: ["lucide-vue-next"],
        // },
    },
    googleFonts: {
        families: {
            Inter: [400, 500, 600, 700, 800],
        },
        display: 'swap',
        download: true,
    },
    icon: {
        collections: ['iconsax', 'isax', 'solar']
    },
    app: {
        head: {
            title: 'Money Tracker Pro',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
                { name: 'apple-mobile-web-app-title', content: 'MoneyApp' },
                { name: 'mobile-web-app-capable', content: 'yes' },
            ],
            link: [
                { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
            ]
        }
    },
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'Money Tracker Pro',
            short_name: 'MoneyApp',
            start_url: '/',
            scope: '/',
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
    router: {
        options: {
            trailingSlash: false
        }
    },
    // Konfigurasi Supabase
    supabase: {
        redirect: false
    }
})
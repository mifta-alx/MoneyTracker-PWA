import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    css: ["./app/assets/css/main.css"],
  compatibilityDate: '2025-07-15',
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
            Inter: [400, 500, 600, 700], // Pilih weight yang kamu butuhkan
        },
        display: 'swap', // Optimasi loading
        download: true,   // Download font agar di-serve dari server sendiri (lebih cepat)
    },
    icon: {
        collections: ['iconsax', 'isax', 'solar']
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

    // Konfigurasi Supabase
    supabase: {
        redirect: false
    }
})
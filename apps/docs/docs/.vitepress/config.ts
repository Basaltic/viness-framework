import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Viness',
    description: 'Viness Framework Documents',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/Basatic/viness' }]
    }
})
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Viness',
    description: 'Viness Framework Documents',
    themeConfig: {
        i18nRouting: true,
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/install' }
        ],

        sidebar: [
            {
                text: '快速入门',
                collapsed: false,
                items: [
                    { text: '特点', link: '/guide' },
                    { text: '安装', link: '/guide/install' },
                    { text: '快速开始', link: '/guide/initialization' }
                ]
            },
            {
                text: '核心',
                collapsed: false,
                items: [
                    { text: '模块', link: '/guide/module' },
                    { text: '服务', link: '/guide/services' },
                    // { text: '服务标识（Token）', link: '/guide/token' },
                    { text: '路由', link: '/guide/router' },
                    { text: '状态', link: '/guide/ui-state' },
                    { text: '国际化', link: '/guide/i18n' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/Basatic/viness' }]
    },
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh'
        }
    }
})

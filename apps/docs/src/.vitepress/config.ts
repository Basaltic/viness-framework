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
                    { text: '特点', link: '/features' },
                    { text: '安装', link: '/install' }
                ]
            },
            {
                text: '核心',
                collapsed: false,
                items: [
                    { text: '路由', link: '/router' },
                    { text: '状态', link: '/state-management' },
                    { text: '服务', link: '/services' },
                    { text: '国际化', link: '/i18n' }
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

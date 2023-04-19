import i18n, { InitOptions } from 'i18next'

import { initReactI18next } from 'react-i18next'

export function initI18n<T>(option: InitOptions<T>) {
    i18n.use(initReactI18next).init({
        debug: false,
        lng: 'zh',
        fallbackLng: 'zh',
        interpolation: {
            escapeValue: false
        },
        ...option
    })
}

export { type InitOptions }

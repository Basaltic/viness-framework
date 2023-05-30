import i18n, { InitOptions } from 'i18next'

import { initReactI18next } from 'react-i18next'
import { IVinessAppConfig } from '../app/app-config'
import { createIdentifier } from '../decorator'

export type VinessI18nConfig<T = object> = InitOptions<T>

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

export const II18n = createIdentifier<I18n>('II18n')

export class I18n {
    constructor(@IVinessAppConfig appConfig: IVinessAppConfig) {
        if (appConfig.i18n) {
            initI18n(appConfig.i18n)
        }
    }
}

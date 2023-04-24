import { createDecorator } from '@viness/di'
import { VinessI18nConfig } from './i18n'
import { VinessRouterConfig } from './router'

export const IVinessAppConfig = createDecorator<VinessAppConfig>('IVinessAppConfig')

export interface IVinessAppConfig {
    i18n?: VinessI18nConfig
    router?: VinessRouterConfig
}

export class VinessAppConfig implements IVinessAppConfig {
    i18n?: VinessI18nConfig
    router?: VinessRouterConfig

    setConfig(config?: IVinessAppConfig) {
        if (!config) return
        const { i18n, router } = config
        this.i18n = i18n
        this.router = router
    }
}
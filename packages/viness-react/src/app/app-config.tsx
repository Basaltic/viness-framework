import { VinessI18nConfig } from '../i18n/i18n'
import { createIdentifier } from '../identifier'
import { VinessRouterConfig } from '../route/routes'

export const IVinessAppConfig = createIdentifier<VinessAppConfig>('IVinessAppConfig')

export interface IVinessAppConfig {
    readonly i18n?: VinessI18nConfig
    readonly router?: VinessRouterConfig
}

export class VinessAppConfig implements IVinessAppConfig {
    readonly i18n?: VinessI18nConfig
    readonly router?: VinessRouterConfig

    constructor(config?: IVinessAppConfig) {
        if (!config) return
        const { i18n, router } = config
        this.i18n = i18n
        this.router = router
    }
}

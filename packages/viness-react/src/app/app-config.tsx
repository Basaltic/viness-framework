import { VinessI18nConfig } from '../i18n/i18n'
import { createIdentifier } from '../decorator'

export const IVinessAppConfig = createIdentifier<VinessAppConfig>('IVinessAppConfig')

export interface IVinessAppConfig {
    readonly i18n?: VinessI18nConfig
}

export class VinessAppConfig implements IVinessAppConfig {
    readonly i18n?: VinessI18nConfig

    constructor(config?: IVinessAppConfig) {
        if (!config) return
        const { i18n } = config
        this.i18n = i18n
    }
}

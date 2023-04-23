import { Container } from '@viness/di'
import { initI18n, InitOptions } from './i18n'

export interface VinessAppConfig {
    i18nConfig?: InitOptions
}

/**
 *
 */
export class VinessApp {
    readonly container: Container

    private config?: VinessAppConfig

    constructor(config?: VinessAppConfig) {
        initI18n(config?.i18nConfig || {})

        this.container = new Container()
        this.config = config
    }

    get regiser() {
        return this.container.register.bind(this)
    }

    get getService() {
        return this.container.get.bind(this)
    }
}

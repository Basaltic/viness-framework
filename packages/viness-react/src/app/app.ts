import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { Effectss } from '../effects'
import { I18n, II18n } from '../i18n/i18n'
import { IVinessRoutes, VinessReactRoutes } from '../route/routes'
import { Services } from './app-services'
import { Stores } from '../store/stores'

/**
 * Manage all the instances
 */
export class VinessApp {
    private innerStores = new Stores()
    private innerServices = new Services()
    private innerEffectss = new Effectss()

    private innerConfig: IVinessAppConfig
    private innerRouter: IVinessRoutes

    constructor(config?: IVinessAppConfig) {
        this.innerConfig = new VinessAppConfig(config)
        this.innerRouter = new VinessReactRoutes()
    }

    get config() {
        return this.innerConfig
    }

    /**
     *
     */
    get routes() {
        return this.innerRouter
    }

    get stores() {
        return this.innerStores
    }

    get services() {
        return this.innerServices
    }

    get effectss() {
        return this.innerEffectss
    }
}

export function createApp(config?: IVinessAppConfig) {
    // initialize the app
    const app = new VinessApp(config)

    app.services.add(I18n, II18n, false)
    return app
}

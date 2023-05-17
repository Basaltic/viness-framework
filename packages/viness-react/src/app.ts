import { SyncDescriptor } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { servicesContainer } from './container'
import { Effectss } from './effects'
import { I18n, II18n } from './i18n'
import { IVinessRouter, VinessReactRouter } from './router'
import { Services } from './services'
import { Stores } from './stores'

/**
 * Manage all the instances
 */
export class VinessApp {
    private innerStores = new Stores()
    private innerServices = new Services()
    private innerEffectss = new Effectss()

    get config() {
        return servicesContainer.get(IVinessAppConfig)
    }
    /**
     * router instance of the application
     */
    get router() {
        return servicesContainer.get(IVinessRouter)
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

export function createVinessApp(config?: IVinessAppConfig) {
    // initialize the app
    const app = new VinessApp()

    // register the builtin features, override it by reregister these services
    app.services.bind(new SyncDescriptor(VinessAppConfig, [config], true), IVinessAppConfig)
    app.services.bind(VinessReactRouter, IVinessRouter)
    app.services.bind(I18n, II18n, false)

    return app
}

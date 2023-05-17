import { SyncDescriptor } from '@viness/di'
import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { servicesContainer } from './container'
import { Effectss, IEffectss } from './effects'
import { I18n, II18n } from './i18n'
import { IVinessRouter, VinessReactRouter } from './router'
import { IServices, Services } from './services'
import { IStores, Stores } from './stores'

/**
 * Manage all the instances
 */
export class VinessApp {
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
        return servicesContainer.get(IStores)
    }

    get services() {
        return servicesContainer.get(IServices)
    }

    get effectss() {
        return servicesContainer.get(IEffectss)
    }
}

export function createVinessApp(config?: IVinessAppConfig) {
    // initialize the app
    const app = new VinessApp()

    // register the builtin features, override it by reregister these services
    app.services.bind(Stores, IStores)
    app.services.bind(Services, IServices)
    app.services.bind(Effectss, IEffectss)
    app.services.bind(VinessReactRouter, IVinessRouter)
    app.services.bind(new SyncDescriptor(VinessAppConfig, [config], true), IVinessAppConfig)
    app.services.bind(I18n, II18n, false)
}

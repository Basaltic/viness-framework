import { IVinessAppConfig, VinessAppConfig } from './app-config'
import { IVinessRoutes, VinessReactRoutes } from '../route/routes'
import { Services } from './app-services'
import { Stores } from '../store/stores'
import { Forms, IForms } from '../form/forms'
import { ServiceIdentifier } from '@viness/di'

export interface IVinessApp {
    readonly forms: IForms
    readonly routes: IVinessRoutes
    readonly stores: Stores
    readonly config: IVinessAppConfig
    readonly services: Services
}

/**
 * Manage all the instances
 */
export class VinessApp {
    private innerForms = new Forms()
    private innerStores = new Stores()
    private innerServices = new Services()

    private innerConfig: IVinessAppConfig
    private innerRouter: IVinessRoutes

    constructor(config?: IVinessAppConfig) {
        this.innerConfig = new VinessAppConfig(config)
        this.innerRouter = new VinessReactRoutes()
    }

    get config() {
        return this.innerConfig
    }

    get forms() {
        return this.innerForms
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

    resolve<T>(id: ServiceIdentifier<T>) {
        return this.services.get(id)
    }
}

export function createApp(config?: IVinessAppConfig) {
    const app = new VinessApp(config)
    return app
}

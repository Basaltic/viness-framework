import { interfaces } from 'inversify'
import { Container } from './container'
import { initI18n, InitOptions } from './i18n'
import { SuperRoute } from './router'
import { UIStore } from './ui-store'

export interface VinessAppConfig {
    i18nConfig: InitOptions
}

/**
 *
 */
export class VinessApp {
    private baseContainer: Container
    private mainContainer: Container

    constructor(config?: VinessAppConfig) {
        initI18n({})

        this.baseContainer = new Container({ skipBaseClassChecks: true })

        this.mainContainer = new Container()

        this.mainContainer.parent = this.baseContainer
    }

    register<T>(identifier: interfaces.ServiceIdentifier<T>, constructor: new (...args: never[]) => T) {
        this.mainContainer.bind(identifier).to(constructor)
    }

    registerRoute<T extends interfaces.Newable<SuperRoute>>(identifier: T) {
        this.baseContainer.bind(identifier).toSelf().inSingletonScope()
    }

    registerStore<S extends object, T extends interfaces.Newable<UIStore<S>>>(identifier: T) {
        this.baseContainer.bind(identifier).toSelf().inSingletonScope()
    }
}

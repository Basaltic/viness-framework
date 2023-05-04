import {
    createDecorator as createDecoratorInner,
    Container,
    ServiceIdentifier,
    ServiceInstanceIdentifier
} from '@viness/di'
import { enableAllPlugins } from 'immer'
import { UIStore } from '.'
import { generateId } from './utils'

/**
 * create service decorator
 *
 * @param serviceId
 * @returns
 */
export function createDecorator<T>(serviceId: string): ServiceIdentifier<T> {
    serviceId = `${serviceId}_${generateId()}`
    return createDecoratorInner(serviceId)
}

// stores -> effects
// services -> effects
// TODO: add more containers, Store Container ??
export const container = new Container()
export const storesContainer = new Container()
export const effectsContainer = new Container()

export const IServiceContainer = createDecorator<ServiceContainer>('IServiceContainer')

export class ServiceContainer {
    /**
     * add new service to app
     */
    addService<T, Services extends {}[]>(
        id: ServiceIdentifier<T>,
        service: new (...services: Services) => T,
        isLazyInit: boolean = true
    ) {
        const supportType = isLazyInit ? 1 : 0
        container.register(id, service, supportType)
    }

    /**
     * get service instance by id
     *
     * @param {ServiceIdentifier<T>} service identifier
     * @returns {T} service instance
     */
    getService<T>(id: ServiceIdentifier<T>) {
        return container.get(id)
    }
}

export const IStoreContainer = createDecorator<StoreContainer>('IStores')

export class StoreContainer {
    constructor() {
        enableAllPlugins()
    }

    /**
     * Add UIStore to the app
     *
     * @param id
     * @param store
     */
    addStore<S extends object, T extends UIStore<S>, Services extends {}[]>(
        id: ServiceIdentifier<T>,
        store: new (...services: Services) => T
    ) {
        container.register(id, store)
    }

    /**
     * Get store instance by id
     *
     * @param {ServiceIdentifier} id
     * @param {ServiceInstanceIdentifier} [instanceId]
     * @returns
     */
    getStore<S extends object, T extends UIStore<S>>(id: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier) {
        return container.get(id, instanceId)
    }
}

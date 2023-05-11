import { createDecorator, Container, ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { enableAllPlugins } from 'immer'
import { UIStore } from '.'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {
    use: (id: ServiceIdentifier<T>) => T
}

/**
 * create service decorator
 *
 * @param serviceId
 * @returns
 */
export function createIdentifier<T>(serviceId: string): VinessServiceIdentifier<T> {
    serviceId = `${serviceId}_${generateId()}`
    const id = createDecorator<T>(serviceId) as VinessServiceIdentifier<T>
    return id
}

// stores -> services

export const storesContainer = new Container()
export const servicesContainer = new Container()

export const IServiceContainer = createIdentifier<ServiceContainer>('IServiceContainer')

export class ServiceContainer {
    /**
     * add new service to app
     */
    addService<T, Services extends {}[]>(
        service: new (...services: Services) => T,
        id?: ServiceIdentifier<T>,
        isLazyInit: boolean = true
    ): ServiceIdentifier<T> {
        const supportType = isLazyInit ? 1 : 0
        if (!id) {
            id = createIdentifier<T>(`${service?.name}_${generateId()}`)
        }
        if (service) {
            servicesContainer.register(id, service, supportType)
        }
        return id
    }

    /**
     * get service instance by id
     *
     * @param {ServiceIdentifier<T>} service identifier
     * @returns {T} service instance
     */
    getService<T>(id: ServiceIdentifier<T>) {
        return servicesContainer.get(id)
    }
}

export const IStoreContainer = createIdentifier<StoreContainer>('IStores')

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
        servicesContainer.register(id, store)
    }

    /**
     * Get store instance by id
     *
     * @param {ServiceIdentifier} id
     * @param {ServiceInstanceIdentifier} [instanceId]
     * @returns
     */
    getStore<S extends object, T extends UIStore<S>>(id: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier) {
        return servicesContainer.get(id, instanceId)
    }
}

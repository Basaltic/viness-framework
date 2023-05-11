import { ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { enableAllPlugins } from 'immer'
import { servicesContainer } from './container'
import { createIdentifier, VinessServiceIdentifier } from './identifier'
import { UIStore } from './ui-store'

export const IStores = createIdentifier<Stores>('IStores')

export class Stores {
    constructor() {
        enableAllPlugins()
    }

    /**
     * Add UIStore to the app
     *
     * @param id
     * @param store
     */
    bind<S extends object, T extends UIStore<S>, Services extends {}[]>(
        store: new (...services: Services) => T,
        identifier: VinessServiceIdentifier<T>
    ): VinessServiceIdentifier<T> {
        if (!identifier) {
            identifier = createIdentifier(store.name)
        }

        servicesContainer.register(identifier, store)
        return identifier
    }

    /**
     * Get store instance by id
     *
     * @param {ServiceIdentifier} identifier
     * @param {ServiceInstanceIdentifier} [instanceId]
     * @returns
     */
    get<S extends object, T extends UIStore<S>>(
        identifier: ServiceIdentifier<T>,
        instanceId?: ServiceInstanceIdentifier
    ) {
        return servicesContainer.get(identifier, instanceId)
    }
}

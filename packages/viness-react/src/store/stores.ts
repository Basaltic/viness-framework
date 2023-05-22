import { ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { enablePatches, enableMapSet } from 'immer'
import { storeContainer } from '../container'
import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { UIStore } from './store'

export class Stores {
    constructor() {
        enablePatches()
        enableMapSet()
    }

    /**
     * add UIStore to the app
     *
     * @param id
     * @param store
     */
    add<S extends object, T extends UIStore<S>, Services extends {}[]>(
        store: new (...services: Services) => T,
        identifier?: VinessServiceIdentifier<T>
    ): VinessServiceIdentifier<T> {
        if (!identifier) {
            identifier = createIdentifier(store.name)
        }

        storeContainer.register(identifier, store)
        return identifier
    }

    /**
     * get store instance by id
     *
     * @param {ServiceIdentifier} identifier
     * @param {ServiceInstanceIdentifier} [instanceId]
     * @returns
     */
    get<S extends object, T extends UIStore<S>>(
        identifier: ServiceIdentifier<T>,
        instanceId?: ServiceInstanceIdentifier
    ) {
        return storeContainer.get(identifier, instanceId)
    }
}

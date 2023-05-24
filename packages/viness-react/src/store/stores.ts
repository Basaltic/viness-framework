import { ServiceIdentifier, ServiceInstanceIdentifier, SyncDescriptor } from '@viness/di'
import { enablePatches, enableMapSet } from 'immer'
import { storeContainer } from '../app/container'
import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { VinessUIStore } from './store'

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
    add<S extends object, T extends VinessUIStore<S>, Services extends {}[]>(
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
    get<S extends object, T extends VinessUIStore<S>>(identifier: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier) {
        return storeContainer.get(identifier, instanceId)
    }

    /**
     * directly create a store
     *
     * @param defaultState
     * @param name
     * @returns
     */
    createStore<S extends object>(defaultState: S, name?: string): VinessServiceIdentifier<VinessUIStore<S>> {
        const uiStoreDescriptor = new SyncDescriptor(VinessUIStore, [defaultState, name], true)
        const identifier = createIdentifier<VinessUIStore<S>>('UIStore')
        storeContainer.register(identifier, uiStoreDescriptor)
        return identifier
    }
}

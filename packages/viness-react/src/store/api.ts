import { SyncDescriptor } from '@viness/di'
import { enablePatches, enableMapSet } from 'immer'
import { storeContainer } from '../app/container'
import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { StoreOptions, VinessUIStore } from './store'

enablePatches()
enableMapSet()

/**
 * Register a store with default implementation
 *
 * @param {StoreOptions} options
 * @returns
 */
export function registerStore<S extends object>(options: StoreOptions<S>): VinessServiceIdentifier<VinessUIStore<S>> {
    return registerStoreExtended(VinessUIStore, options)
}

/**
 * Register a store with the custom extended implementation
 *
 * @param store
 * @returns
 */
export function registerStoreExtended<S extends object, T extends VinessUIStore<S>>(
    extendedStore: new (...services: any[]) => T,
    options: StoreOptions<S>
) {
    const uiStoreDescriptor = new SyncDescriptor(extendedStore, [options], true)
    const identifier = createIdentifier<VinessUIStore<S>>('UIStore') as VinessServiceIdentifier<T>
    storeContainer.register(identifier, uiStoreDescriptor)
    return identifier
}

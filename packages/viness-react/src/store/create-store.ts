import { createDecorator, ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { StoreOptions, VinessUIStore } from './store'
import { ContaienrUtil } from '../app/container'

/**
 * Create ui state store
 *
 * @param options
 */
export function createStore<S extends object>(options?: StoreOptions<S>): ServiceIdentifier<VinessUIStore<S>> {
    const storeDecorator = createDecorator<VinessUIStore<S>>(options?.name || 'store')
    const ctor = new SyncDescriptor(VinessUIStore, [options])
    ContaienrUtil.register(storeDecorator, ctor)
    return storeDecorator
}

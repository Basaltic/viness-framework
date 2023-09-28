import { SyncDescriptor } from '@viness/di'
import { IVinessUIStore, StoreOption, VinessUIStoreInjectableToken } from './protocol'
import { VinessUIStore } from './store'
import { TokenType, createToken } from '../token'

/**
 * Create ui state store injectable token
 *
 * @param options
 */
export function createStoreToken<S extends object>(option: StoreOption<S>): VinessUIStoreInjectableToken<S> {
    const token = createToken<IVinessUIStore<S>>(`${option.name || ''}viness-store`) as VinessUIStoreInjectableToken<S>
    token.tokenType = TokenType.Store
    token.option = option
    return token
}

/**
 * Create ui state store
 *
 * @param options
 */
export function createStore<S extends object>(option: StoreOption<S>): SyncDescriptor<VinessUIStore<S>> {
    const ctor = new SyncDescriptor(VinessUIStore, [option])
    return ctor
}

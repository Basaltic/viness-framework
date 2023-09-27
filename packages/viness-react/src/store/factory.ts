import { SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from '../container'
import { StoreOption, VinessUIStoreInjectableToken } from './protocol'
import { VinessUIStore } from './store'
import { createToken } from '../token'

/**
 * Create ui state store injectable token
 *
 * @param options
 */
// export function createStore<S extends object>(option: StoreOption<S>): VinessUIStoreInjectableToken<S> {
//     const token = createToken<IVinessUIStore<S>>('viness-store') as VinessUIStoreInjectableToken<S>
//     token.tokenType = TokenType.Store
//     token.option = option
//     return token
// }

/**
 * Create ui state store
 *
 * @param options
 */
export function createStore<S extends object>(options?: StoreOption<S>): VinessUIStoreInjectableToken<S> {
    const token = createToken<VinessUIStore<S>>(options?.name || 'store') as VinessUIStoreInjectableToken<S>
    const ctor = new SyncDescriptor(VinessUIStore, [options])
    ContaienrUtil.register(token, ctor)
    return token
}

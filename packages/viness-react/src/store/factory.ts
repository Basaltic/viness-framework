import { IVinessUIStore, StoreOption, VinessUIStoreInjectableToken } from './protocol'
import { TokenType, createToken } from '../token'

export const autowiredStores = new Map<VinessUIStoreInjectableToken<any>, null>()

/**
 * Create ui state store injectable token
 *
 * @param options
 */
export function createStore<S extends object>(option: StoreOption<S>): VinessUIStoreInjectableToken<S> {
    const token = createToken<IVinessUIStore<S>>(`${option.name || ''}_viness-store`) as VinessUIStoreInjectableToken<S>
    token.tokenType = TokenType.Store
    token.option = option

    autowiredStores.set(token, null)

    return token
}

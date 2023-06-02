import { useStore } from 'zustand'
import { createDecorator, VinessServiceIdentifier } from '../decorator'
import { useResolve } from '../hooks'
import { VinessUIStore } from './store-v2'

export function convertToStoreHooks<S extends object, T extends VinessUIStore<S>>(id: VinessServiceIdentifier<T>) {
    return {
        useState: <U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U => {
            const store = useResolve(id) as any
            return useStore(store, selector as any, equals)
        },
        useActions: () => {
            return useResolve(id)
        }
    }
}

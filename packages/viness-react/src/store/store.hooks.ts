import { useStore } from 'zustand'
import { VinessServiceToken } from '../token'
import { useResolve } from '../hooks'
import { VinessUIStore } from './store'
import { useMemo } from 'react'

export const useResolveStore = <S extends object, T extends VinessUIStore<S>>(id: VinessServiceToken<T>) => {
    const store = useResolve(id)
    return useMemo(
        () => ({
            use: () => store.use,
            useState: <U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U => {
                const store = useResolve(id) as any
                return useStore(store, selector as any, equals)
            }
        }),
        []
    )
}

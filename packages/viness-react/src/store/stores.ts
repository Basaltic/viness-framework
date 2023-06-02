import { useStore } from 'zustand'
import { VinessServiceIdentifier } from '../decorator'
import { useResolve } from '../hooks'
import { VinessUIStore } from './store-v2'

export interface IStores {
    // register<S extends object, T extends VinessUIStore<S>>(id: VinessServiceIdentifier<T>, store: new (...services: any[]) => T): void
}

export class Stores implements IStores {
    register<S extends object, T extends VinessUIStore<S>>(id: VinessServiceIdentifier<T>, store: new (...services: any[]) => T) {
        return <U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U => {
            const api = useResolve(id)
            return useStore(api, selector as any, equals)
        }
    }
}

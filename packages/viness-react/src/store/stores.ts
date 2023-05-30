import { VinessServiceIdentifier } from '../decorator'
import { VinessUIStore } from './store'

export interface IStores {
    // register<S extends object, T extends VinessUIStore<S>>(id: VinessServiceIdentifier<T>, store: new (...services: any[]) => T): void
}

export class Stores implements IStores {}

import { ServiceIdentifier } from '@viness/core';
import { Patch } from 'immer';

export type StoreInstanceId = string | number;

export interface IVinessUIStore<S extends object> {
    use: { [K in keyof S]: () => S[K] };
    setState(updater: S | Partial<S> | ((state: S) => S | Partial<S> | void), replace?: boolean | undefined): void;
    useState<U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U;
    setStateWithPatches(updater: (state: S) => S | void): [Patch[], Patch[]];
    applyPatches(patches: Patch[]): void;
    subscribe(listener: (state: S, prevState: S) => void): () => void;
}

export interface StoreOption<S extends object> {
    defaultState: S;
    name?: string;
}

export type VinessUIStoreInjectableToken<S extends object> = ServiceIdentifier<IVinessUIStore<S>> & {
    option: StoreOption<S>;
};

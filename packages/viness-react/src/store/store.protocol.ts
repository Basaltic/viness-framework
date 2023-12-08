import { Patch } from 'immer';

export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}

export type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type TAction<S> = (state: S, ...args: any) => void;

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

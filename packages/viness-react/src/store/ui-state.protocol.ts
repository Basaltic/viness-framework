import { Patch } from 'immer';

export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}

export type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export interface IUIState<StateValue extends object> {
    use: { [K in keyof StateValue]: () => StateValue[K] };
    setState(
        updater: StateValue | Partial<StateValue> | ((state: StateValue) => StateValue | Partial<StateValue> | void),
        replace?: boolean | undefined
    ): void;
    useState<U>(selector: (state: StateValue) => U, equals?: (a: U, b: U) => boolean): U;
    setStateWithPatches(updater: (state: StateValue) => StateValue | void): [Patch[], Patch[]];
    applyPatches(patches: Patch[]): void;
    subscribe(listener: (state: StateValue, prevState: StateValue) => void): () => void;
}

// TODO: Plugin system & manager
export interface StateOption<StateValue extends object> {
    default: StateValue;
    name?: string;
}

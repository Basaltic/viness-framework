import { Patch } from 'immer';

export interface IUIStore<StateValue extends object> {
    use: { [K in keyof StateValue]: () => StateValue[K] };
    getState(): StateValue;
    setState(
        updater: StateValue | Partial<StateValue> | ((state: StateValue) => StateValue | Partial<StateValue> | void),
        replace?: boolean | undefined
    ): void;
    useState<U>(selector: (state: StateValue) => U, equals?: (a: U, b: U) => boolean): U;
    setStateWithPatches(updater: (state: StateValue) => StateValue | void): [Patch[], Patch[]];
    applyPatches(patches: Patch[]): void;
    subscribe(listener: (state: StateValue, prevState: StateValue) => void): () => void;
}

export interface StateOption<StateValue extends object> {
    default: StateValue;
    name?: string;
}

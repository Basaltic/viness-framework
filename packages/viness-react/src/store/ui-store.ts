import { StoreApi, useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { produce, produceWithPatches, applyPatches, Patch } from 'immer';
import { IUIStore } from './ui-store.protocol';
import type { StateOption } from './ui-store.protocol';

/**
 * extend this class to create ui store
 */
export class UIStore<StateValue extends object> implements IUIStore<StateValue> {
    readonly name: string;
    readonly defaultState: StateValue | {};
    private storeApi: StoreApi<StateValue>;
    private selectors!: { [K in keyof StateValue]: () => StateValue[K] };

    constructor(options?: StateOption<StateValue>) {
        const { default: defaultState = {}, name = '' } = options || {};
        let storeApi: any;
        if (process.env.NODE_ENV === 'development') {
            storeApi = createStore(devtools(() => defaultState, { name }));
        } else {
            storeApi = createStore(() => defaultState);
        }
        this.storeApi = storeApi;
        this.name = name;
        this.defaultState = defaultState;
    }

    /**
     * auto generated selectors of the object keys
     * ** use this in react functional components **
     */
    get use() {
        if (this.selectors) {
            return this.selectors;
        }
        const state = this.getState();
        const selectors: any = {};
        for (const k of Object.keys(state)) {
            selectors[k] = () => useStore(this.storeApi, (s: any) => s[k as keyof typeof s] as any);
        }

        this.selectors = selectors as any;

        return this.selectors;
    }

    /**
     * subscribe the state in this store
     * ** use this in react functional components **
     *
     * @param selector
     * @param equals
     * @returns
     */
    useState<U>(selector: (state: StateValue) => U, equals?: (a: U, b: U) => boolean): U {
        return useStore(this.storeApi, selector as any, equals);
    }

    /**
     * get the actually state object in the store without subscribtion
     */
    getState() {
        return this.storeApi.getState();
    }

    /**
     * change the state
     */
    setState(
        updater: StateValue | Partial<StateValue> | ((state: StateValue) => StateValue | Partial<StateValue> | void),
        replace?: boolean | undefined
    ) {
        if (typeof updater === 'function') {
            this.storeApi.setState(produce(updater) as any, replace);
        } else {
            this.storeApi.setState(updater as any, replace);
        }
    }

    /**
     * change the state and return the patches
     *
     * @param updater
     * @param replace
     * @returns [patches, inverse patches]
     */
    setStateWithPatches(updater: (state: StateValue) => StateValue | void): [Patch[], Patch[]] {
        const state = this.getState();
        const [nextState, patches, inversePatches] = produceWithPatches(state, updater);
        this.storeApi.setState(nextState);
        return [patches, inversePatches];
    }

    /**
     * applay change patches to this store state
     *
     * @param patches
     */
    applyPatches(patches: Patch[]) {
        const updater = (s: StateValue) => applyPatches(s, patches);
        this.storeApi.setState(updater);
    }

    /**
     * subscribe the modification of the state in this store
     */
    subscribe(listener: (state: StateValue, prevState: StateValue) => void): () => void {
        return this.storeApi.subscribe(listener);
    }

    /**
     * @deprecated
     */
    destroy() {
        return this.storeApi.destroy();
    }
}

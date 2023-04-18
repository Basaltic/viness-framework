import { StoreApi, UseBoundStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never

const createSelectors = <S extends UseBoundStore<StoreApi<unknown>>>(_store: S) => {
    const store = _store as WithSelectors<typeof _store>
    store.use = {}

    const state = store.getState() as any
    for (const k of Object.keys(state)) {
        ;(store.use as any)[k] = () => store((s: any) => s[k as keyof typeof s])
    }

    return store
}

/**
 * extend this class to create ui state
 */
export class UIStore<S extends object> {
    protected store: UseBoundStore<StoreApi<S>>

    constructor(defaultState: S, name?: string) {
        if (process.env.NODE_ENV === 'development') {
            this.store = createStore(devtools(immer(() => defaultState))) as any
        } else {
            this.store = createStore(immer(() => defaultState)) as any
        }
    }

    /**
     * auto selectors for the first level of the state object
     */
    get useSelectors() {
        return createSelectors(this.store)
    }

    get useStore() {
        return this.store
    }

    /**
     * get the actually state object in the store
     */
    protected getState() {
        return this.store.getState()
    }

    /**
     * subscribe the modification of the state in this store
     */
    protected subscribe(listener: (state: S, prevState: S) => void): () => void {
        return this.store.subscribe(listener)
    }

    /**
     * change the state
     */
    protected setState(updater: S | Partial<S> | ((state: S) => S | Partial<S>), replace?: boolean) {
        this.store.setState(updater, replace)
    }
}

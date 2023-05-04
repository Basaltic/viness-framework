import { StoreApi, UseBoundStore, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { ServiceIdentifier } from '@viness/di'

export type StoreInstanceId = string | number
export type StoreIdentifier<T> = (instanceId: string | number) => ServiceIdentifier<T>

type ExtractState<S> = S extends {
    getState: () => infer T
}
    ? T
    : never

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
 * extend this class to create ui store
 */
export class UIStore<S extends object> {
    protected store: WithSelectors<UseBoundStore<StoreApi<S>>>

    constructor(defaultState: S, name?: string) {
        let store: any
        if (process.env.NODE_ENV === 'development') {
            store = create(
                devtools(
                    immer(() => defaultState),
                    { name }
                )
            )
        } else {
            store = create(immer(() => defaultState))
        }

        this.store = createSelectors(store)
    }

    /**
     * auto generated selectors of the object keys
     *  ** use this function in react function components **
     */
    get use() {
        return this.store.use
    }

    /**
     * subscribe the state with custom selectors
     * ** use this function in react function components **
     *
     * @param selector
     * @param equals
     * @returns
     */
    useState<U>(selector: (state: ExtractState<UseBoundStore<StoreApi<S>>>) => U, equals?: (a: U, b: U) => boolean): U {
        return this.store(selector, equals)
    }

    /**
     * get the actually state object in the store
     */
    getState() {
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
    protected setState(updater: S | Partial<S> | ((state: S) => S | Partial<S> | void), replace?: boolean) {
        this.store.setState(updater as any, replace)
    }
}

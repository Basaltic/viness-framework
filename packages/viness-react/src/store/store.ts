import { StoreApi, UseBoundStore, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ServiceIdentifier } from '@viness/di'
import { produce, produceWithPatches, applyPatches, Patch } from 'immer'

export { type Patch }
export type StoreInstanceId = string | number
export type StoreIdentifier<T> = (instanceId: string | number) => ServiceIdentifier<T>

type ExtractState<S> = S extends { getState: () => infer T } ? T : never
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
export class VinessUIStore<S extends object> {
    protected store: WithSelectors<UseBoundStore<StoreApi<S>>>

    constructor(defaultState: S, name?: string) {
        let store: any

        if (process.env.NODE_ENV === 'development') {
            store = create(devtools(() => defaultState, { name }))
        } else {
            store = create(() => defaultState)
        }

        this.store = createSelectors(store)
    }

    /**
     * auto generated selectors of the object keys
     *  ** use this in react functional components **
     */
    get use() {
        return this.store.use
    }

    /**
     * get the actually state object in the store without subscribtion
     */
    getState() {
        return this.store.getState()
    }

    /**
     * subscribe the state with custom selectors
     * ** use this function in react functional components **
     *
     * @param selector
     * @param equals
     * @returns
     */
    useState<U>(selector: (state: ExtractState<UseBoundStore<StoreApi<S>>>) => U, equals?: (a: U, b: U) => boolean): U {
        return this.store(selector, equals)
    }

    /**
     * subscribe the modification of the state in this store
     */
    subscribe(listener: (state: S, prevState: S) => void): () => void {
        return this.store.subscribe(listener)
    }

    /**
     * change the state
     */
    setState(
        updater: S | Partial<S> | ((state: S) => S | void),
        withPatches?: (patches: Patch[], inversePatches: Patch[]) => void,
        replace?: boolean
    ) {
        if (typeof updater === 'function') {
            if (withPatches) {
                const state = this.getState()
                const nextState = produce(state, updater, withPatches)
                this.store.setState(nextState, replace)
            } else {
                this.store.setState(produce(updater) as any, replace)
            }
        } else {
            this.store.setState(updater as any, replace)
        }
    }

    /**
     * change the state and return the patches
     *
     * @param updater
     * @param replace
     * @returns [patches, inverse patches]
     */
    setStateWithPatches(updater: (state: S) => S | void, replace?: boolean): [Patch[], Patch[]] {
        const state = this.getState()
        const [nextState, patches, inversePatches] = produceWithPatches(state, updater)
        this.store.setState(nextState, replace)
        return [patches, inversePatches]
    }

    /**
     * applay change patches to this store state
     *
     * @param patches
     */
    applyPatches(patches: Patch[]) {
        const updater = (s: S) => applyPatches(s, patches)
        this.store.setState(updater)
    }
}

import { StoreApi, UseBoundStore, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ServiceIdentifier } from '@viness/di'
import { produce, produceWithPatches, applyPatches, Patch } from 'immer'

export type StoreInstanceId = string | number
export type StoreIdentifier<T> = (instanceId: string | number) => ServiceIdentifier<T>

export interface StoreOptions<S extends object> {
    defaultState: S
    name?: string
    immer?: boolean
}

/**
 * extend this class to create ui store
 */
export class VinessUIStore<S extends object> {
    protected store: UseBoundStore<StoreApi<S>>
    private selectors!: { [K in keyof S]: () => S[K] }

    constructor(options: StoreOptions<S>) {
        const { defaultState, name = '' } = options
        let store: any

        if (process.env.NODE_ENV === 'development') {
            store = create(devtools(() => defaultState, { name }))
        } else {
            store = create(() => defaultState)
        }

        this.store = store
    }

    /**
     * auto generated selectors of the object keys
     *  ** use this in react functional components **
     */
    get use() {
        if (this.selectors) {
            return this.selectors
        }
        const state = this.getState()
        const selectors: any = {}
        for (const k of Object.keys(state)) {
            selectors[k] = () => this.useState((s: any) => s[k as keyof typeof s])
        }

        this.selectors = selectors as any

        return this.selectors
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
    useState<U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U {
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

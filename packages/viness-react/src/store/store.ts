import { StoreApi, UseBoundStore, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce, produceWithPatches, applyPatches, Patch, enableMapSet, enablePatches } from 'immer'

enableMapSet()
enablePatches()

export type StoreInstanceId = string | number

export interface StoreOptions<S extends object> {
    defaultState?: S
    name?: string
    immer?: boolean
}

export interface IVinessUIStore<S extends object> {
    readonly use: { [K in keyof S]: () => S[K] }
    /**
     * get the actually state object in the store without subscribtion
     */
    getState(): S
    /**
     * change the state & trigger ui updates
     */
    setState(
        updater: S | Partial<S> | ((state: S) => S | void),
        withPatches?: (patches: Patch[], inversePatches: Patch[]) => void,
        replace?: boolean
    ): void
    /**
     * change the state and return the patches
     *
     * @param updater
     * @param replace
     * @returns [patches, inverse patches]
     */
    setStateWithPatches(updater: (state: S) => S | void, replace?: boolean): [Patch[], Patch[]]
    /**
     * applay change patches to this store state
     */
    applyPatches(patches: Patch[]): void
    /**
     * subscribe the modification of the state in this store
     */
    subscribe(listener: (state: S, prevState: S) => void): () => void
    /**
     * subscribe the state with custom selectors
     * ** use this function in react functional components **
     *
     * @param selector
     * @param equals
     * @returns
     */
    useState<U>(selector: (state: S) => U, equals?: (a: U, b: U) => boolean): U
}

/**
 * extend this class to create ui store
 */
export class VinessUIStore<S extends object> implements IVinessUIStore<S> {
    protected storeApi: UseBoundStore<StoreApi<S>>
    private selectors!: { [K in keyof S]: () => S[K] }

    constructor(options?: StoreOptions<S>) {
        const { defaultState = {}, name = '' } = options || {}
        let store: any

        if (process.env.NODE_ENV === 'development') {
            store = create(devtools(() => defaultState, { name }))
        } else {
            store = create(() => defaultState)
        }

        this.storeApi = store
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
        return this.storeApi.getState()
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
                this.storeApi.setState(nextState, replace)
            } else {
                this.storeApi.setState(produce(updater) as any, replace)
            }
        } else {
            this.storeApi.setState(updater as any, replace)
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
        this.storeApi.setState(nextState, replace)
        return [patches, inversePatches]
    }

    /**
     * applay change patches to this store state
     *
     * @param patches
     */
    applyPatches(patches: Patch[]) {
        const updater = (s: S) => applyPatches(s, patches)
        this.storeApi.setState(updater)
    }

    /**
     * subscribe the modification of the state in this store
     */
    subscribe(listener: (state: S, prevState: S) => void): () => void {
        return this.storeApi.subscribe(listener)
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
        return this.storeApi(selector, equals)
    }
}

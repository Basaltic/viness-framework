import { enableMapSet, enablePatches } from 'immer'

enableMapSet()
enablePatches()

export * from './store'
export * from './store.hooks'
export * from './create-store'
export { type Patch, applyPatches, produceWithPatches } from 'immer'

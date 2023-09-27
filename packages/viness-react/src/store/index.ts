import { enableMapSet, enablePatches } from 'immer'

enableMapSet()
enablePatches()

export * from './store'
export * from './factory'
export * from './protocol'
export { type Patch, applyPatches, produceWithPatches } from 'immer'

import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { type Patch, applyPatches, produceWithPatches } from 'immer';

export * from './store';
export * from './store.protocol';

import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { type Patch, applyPatches, produceWithPatches } from 'immer';

export * from './ui-store';
export * from './ui-store.protocol';
export * from './ui-store.factory';

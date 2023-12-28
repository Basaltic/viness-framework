import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { type Patch, applyPatches, produceWithPatches } from 'immer';

export * from './ui-state';
export * from './ui-state.protocol';
export * from './ui-state.factory';

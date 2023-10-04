import { enableMapSet, enablePatches } from 'immer';

enableMapSet();
enablePatches();

export { type Patch, applyPatches, produceWithPatches } from 'immer';

export * from './store';
export * from './protocol';

export * from './store-module';
export * from './action.annotation';
export * from './action.protocol';
export * from './action-dispatcher';

export * from './hooks';

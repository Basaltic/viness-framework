import { Patch, UIStore } from '@viness/react';
import { CounterState, ICounterStore, ICouterEffects, defaultCountareState } from './counter-store.protocol';
import { Injectable } from '@viness/core';

@Injectable({ token: ICounterStore })
export class CounterStore extends UIStore<CounterState> {
    private patchesQueue: Array<[Patch[], Patch[]]> = [];
    private redoPatchesQueue: Array<[Patch[], Patch[]]> = [];

    constructor() {
        super({ defaultState: defaultCountareState });
    }

    undo() {
        const patches = this.patchesQueue.pop();
        if (patches) {
            this.applyPatches(patches[1]);
            this.redoPatchesQueue.push(patches);
        }
    }

    redo() {
        const patches = this.redoPatchesQueue.pop();
        if (patches) {
            this.applyPatches(patches[0]);
            this.patchesQueue.push(patches);
        }
    }

    increase() {
        const patches = this.setStateWithPatches((s) => {
            s.count += 1;
        });

        this.patchesQueue.push(patches);
        this.redoPatchesQueue = [];
    }

    decrease() {
        const [patches, inversePatches] = this.setStateWithPatches((s) => {
            s.count -= 1;
        });
        this.patchesQueue.push([patches, inversePatches]);

        this.redoPatchesQueue = [];
    }

    select = (id: string) =>
        this.setState((s) => {
            s.selectedIds[id] = 1;
        });

    deselect = (id: string) =>
        this.setState((s) => {
            delete s.selectedIds[id];
        });
}

@Injectable({ token: ICouterEffects })
export class CounterEffects implements ICouterEffects {
    constructor(@ICounterStore private counterStore: ICounterStore) {}
}

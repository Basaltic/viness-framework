import { Patch } from '@viness/react';
import { Inject, Injectable } from '@viness/core';
import { counterStateToken } from './counter-store.protocol';
import type { CounterState } from './counter-store.protocol';

@Injectable()
export class CounterActions {
    private patchesQueue: Array<[Patch[], Patch[]]> = [];
    private redoPatchesQueue: Array<[Patch[], Patch[]]> = [];

    constructor(@Inject(counterStateToken) private counterState: CounterState) {}

    undo() {
        const patches = this.patchesQueue.pop();
        if (patches) {
            this.counterState.applyPatches(patches[1]);
            this.redoPatchesQueue.push(patches);
        }
    }

    redo() {
        const patches = this.redoPatchesQueue.pop();
        if (patches) {
            this.counterState.applyPatches(patches[0]);
            this.patchesQueue.push(patches);
        }
    }

    increase() {
        const patches = this.counterState.setStateWithPatches((s) => {
            s.count += 1;
        });

        this.patchesQueue.push(patches);
        this.redoPatchesQueue = [];
    }

    decrease() {
        const [patches, inversePatches] = this.counterState.setStateWithPatches((s) => {
            s.count -= 1;
        });
        this.patchesQueue.push([patches, inversePatches]);

        this.redoPatchesQueue = [];
    }

    select = (id: string) =>
        this.counterState.setState((s) => {
            s.selectedIds[id] = 1;
        });

    deselect = (id: string) =>
        this.counterState.setState((s) => {
            delete s.selectedIds[id];
        });
}

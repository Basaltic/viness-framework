import { Patch, Injectable } from '@viness/react'
import { ICounterStore, ICouterActions } from './counter-store.protocol'

@Injectable(ICouterActions)
export class CounterActions implements ICouterActions {
    private patchesQueue: Array<[Patch[], Patch[]]> = []
    private redoPatchesQueue: Array<[Patch[], Patch[]]> = []

    constructor(@ICounterStore private counterStore: ICounterStore) {}

    undo() {
        const patches = this.patchesQueue.pop()
        if (patches) {
            this.counterStore.applyPatches(patches[1])
            this.redoPatchesQueue.push(patches)
        }
    }

    redo() {
        const patches = this.redoPatchesQueue.pop()
        if (patches) {
            this.counterStore.applyPatches(patches[0])
            this.patchesQueue.push(patches)
        }
    }

    increase() {
        const patches = this.counterStore.setStateWithPatches((s) => {
            s.count += 1
        })

        this.patchesQueue.push(patches)
        this.redoPatchesQueue = []
    }

    decrease() {
        const [patches, inversePatches] = this.counterStore.setStateWithPatches((s) => {
            s.count -= 1
        })
        this.patchesQueue.push([patches, inversePatches])

        this.redoPatchesQueue = []
    }

    select = (id: string) =>
        this.counterStore.setState((s) => {
            s.selectedIds[id] = 1
        })

    deselect(id: string) {
        this.counterStore.setState((s) => {
            delete s.selectedIds[id]
        })
    }
}

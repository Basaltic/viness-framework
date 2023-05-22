import { UIStore, Patch } from '@viness/react'

interface CounterState {
    count: number
    selectedIds: Record<string, any>
}

const defaultCountareState: CounterState = {
    count: 0,
    selectedIds: {}
}

export class CounterStore extends UIStore<CounterState> {
    private patchesQueue: Array<[Patch[], Patch[]]> = []
    private redoPatchesQueue: Array<[Patch[], Patch[]]> = []

    constructor() {
        super(defaultCountareState, 'counter-store')
    }

    undo() {
        const patches = this.patchesQueue.pop()
        if (patches) {
            this.applyPatches(patches[1])
            this.redoPatchesQueue.push(patches)
        }
    }

    redo() {
        const patches = this.redoPatchesQueue.pop()
        if (patches) {
            this.applyPatches(patches[0])
            this.patchesQueue.push(patches)
        }
    }

    increase() {
        const patches = this.setStateWithPatches((s) => {
            s.count += 1
        })

        this.patchesQueue.push(patches)
        this.redoPatchesQueue = []
    }

    decrease() {
        this.setState(
            (s) => {
                s.count -= 1
            },
            (patches, inversePatches) => {
                this.patchesQueue.push([patches, inversePatches])
            }
        )

        this.redoPatchesQueue = []
    }

    select = (id: string) =>
        this.setState((s) => {
            s.selectedIds[id] = 1
        })

    deselect(id: string) {
        this.setState((s) => {
            delete s.selectedIds[id]
        })
    }
}

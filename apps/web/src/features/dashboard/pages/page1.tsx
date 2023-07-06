import { useResolve } from '@viness/react'
import { CounterStore } from '../store/counter-store.protocol'

export function DashboardPage1() {
    const counterStore = useResolve(CounterStore)
    const count = counterStore.use.count()

    const handleIncrease = () => {
        counterStore.increase()
    }

    const handleDecrease = () => {
        counterStore.decrease()
    }

    const handleUndo = () => {
        counterStore.undo()
    }

    const handleRedo = () => {
        counterStore.redo()
    }

    return (
        <div>
            <div>dashboard page1</div>
            <div>count: {count}</div>
            <button onClick={handleIncrease}>increase</button>
            <button onClick={handleDecrease}>decrease</button>
            <button onClick={handleUndo}>undo</button>
            <button onClick={handleRedo}>redo</button>
        </div>
    )
}

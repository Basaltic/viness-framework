import { CounterStoreIdentifier } from '../store/counter.store'

export function DashboardPage1() {
    const store = CounterStoreIdentifier.useResolve()
    const count = store.use.count()

    const handleIncrease = () => {
        store.increase()
    }

    const handleDecrease = () => {
        store.decrease()
    }

    const handleUndo = () => {
        store.undo()
    }

    const handleRedo = () => {
        store.redo()
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

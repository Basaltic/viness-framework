import { useStore } from '@viness/react'
import { ICounterStore } from '../store/counter.store'

export function DashboardPage1() {
    const store = useStore(ICounterStore)
    const count = store.use.count()

    const handleIncrease = () => {
        store.increase()
    }

    return (
        <div>
            dashboard page1
            <div>count: {count}</div>
            <button onClick={handleIncrease}>increase</button>
        </div>
    )
}

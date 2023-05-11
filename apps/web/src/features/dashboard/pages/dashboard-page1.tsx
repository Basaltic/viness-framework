import { ICounterStore } from '../../../app-stores'

export function DashboardPage1() {
    const store = ICounterStore.get()
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

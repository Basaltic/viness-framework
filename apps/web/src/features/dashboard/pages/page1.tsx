import { useCounterStore } from '../store/counter-store.hook';

export function DashboardPage1() {
    const counterStore = useCounterStore();
    const count = counterStore.use.count();

    const handleIncrease = () => {};

    const handleDecrease = () => {};

    const handleUndo = () => {};

    const handleRedo = () => {};

    return (
        <div>
            <div>dashboard page1</div>
            <div>count: {count}</div>
            <button onClick={handleIncrease}>increase</button>
            <button onClick={handleDecrease}>decrease</button>
            <button onClick={handleUndo}>undo</button>
            <button onClick={handleRedo}>redo</button>
            <button> go</button>
        </div>
    );
}

import { useDashboardPage2Route } from '../../../routes/routes.protocol';
import { useCounterEffects, useCounterStore } from '../store/counter-store.protocol';

export function DashboardPage1() {
    const route = useDashboardPage2Route();

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
            <button onClick={() => route.navigate({})}> go</button>
        </div>
    );
}

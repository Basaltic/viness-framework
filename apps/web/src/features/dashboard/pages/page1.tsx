import { useDashboardPage2Route } from '../../../routes/routes.protocol';
import { useCounterStore } from '../store/counter-store.hook';

export function DashboardPage1() {
    const counterStore = useCounterStore();
    const count = counterStore.use.count();

    const page2Route = useDashboardPage2Route();

    const handleIncrease = () => {};

    const handleDecrease = () => {};

    const handleUndo = () => {};

    const handleRedo = () => {};

    const goToP2 = () => {
        page2Route.navigate({});
    };

    return (
        <div>
            <div>dashboard page1</div>
            <div>count: {count}</div>
            <button onClick={handleIncrease}>increase</button>
            <button onClick={handleDecrease}>decrease</button>
            <button onClick={handleUndo}>undo</button>
            <button onClick={handleRedo}>redo</button>
            <button onClick={goToP2}> go</button>
        </div>
    );
}

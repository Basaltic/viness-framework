import { useResolve } from '@viness/react';
import { useDashboardPage2Route } from '../../../routes/routes.protocol';
import { useCounterState } from '../store/counter-store.protocol';
import { CounterActions } from '../store/counter-store';

export function DashboardPage1() {
    const counterState = useCounterState();
    const count = counterState.use.count();
    const counterActions = useResolve(CounterActions);

    const page2Route = useDashboardPage2Route();

    const handleIncrease = () => counterActions.increase();

    const handleDecrease = () => counterActions.decrease();

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

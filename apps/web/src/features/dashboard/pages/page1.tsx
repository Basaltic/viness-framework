import { useActionDispatcher } from '@viness/react';
import { useDashboardPage2Route } from '../../../routes/routes.protocol';
import { useCounterActions, useCounterStore } from '../store/counter-store.protocol';
import { IncreaseAction } from '../store/counter-store.action';

export function DashboardPage1() {
    const counterStore = useCounterStore();
    const counterActions = useCounterActions();

    const count = counterStore.use.count();

    const route = useDashboardPage2Route();

    const actionDispatcher = useActionDispatcher();

    const handleIncrease = () => {
        actionDispatcher.dispatch(new IncreaseAction());
    };

    const handleDecrease = () => {
        counterActions.decrease();
    };

    const handleUndo = () => {
        counterActions.undo();
    };

    const handleRedo = () => {
        counterActions.redo();
    };

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

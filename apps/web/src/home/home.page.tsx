import { useHomeStore } from './store/home-store';
import { homeEffectsToken } from './store/home-effects';
import { resolve } from '@viness/core';

export function HomePage() {
    const homeStore = useHomeStore();
    const count = homeStore.use.count();

    const homeEffecs = resolve(homeEffectsToken)();

    const handleIncrease = () => {
        homeEffecs.increase(10);
    };

    const handleDecrease = () => {
        homeEffecs.decrease(10);
    };

    return (
        <div>
            <div>count: {count}</div>
            <div>
                <button onClick={handleIncrease}>inc</button>
                <button onClick={handleDecrease}>dec</button>
            </div>
        </div>
    );
}

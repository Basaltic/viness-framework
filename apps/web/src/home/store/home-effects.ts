import { resolve, token } from '@viness/core';
import { homeStoreToken } from './home-store';

export const homeEffectsToken = token<HomeEffects, any>('home-effects');

export class HomeEffects {
    homeStore = resolve(homeStoreToken)();

    increase(count: number = 0) {
        this.homeStore.setState((s) => {
            s.count += count;
        });
    }

    decrease(count: number = 0) {
        this.homeStore.setState((s) => {
            s.count -= count;
        });
    }
}

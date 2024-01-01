import { UIStore, createStore, useResolve } from '@viness/react';

export interface ICounterStateValue {
    count: number;
    selectedIds: Record<string, any>;
}
export const defaultCounterState: ICounterStateValue = {
    count: 0,
    selectedIds: {}
};

export type CounterState = UIStore<ICounterStateValue>;

export const couterStateProvider = createStore<ICounterStateValue>({ default: defaultCounterState });
export const counterStateToken = couterStateProvider.token;
export const useCounterState = () => useResolve(counterStateToken);

import { useResolve } from '@viness/react';
import { CounterStore } from './counter-store';

export const useCounterStore = () => useResolve<CounterStore>(CounterStore);

import { useInject } from '@viness/react';
import { CounterStore } from './counter-store';

export const useCounterStore = () => useInject<CounterStore>(CounterStore);

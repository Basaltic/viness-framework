import { resolve } from '@viness/core';
import { createStore } from '@viness/react';

export type HomeState = {
    count: number;
};

export const defaultHomeState: HomeState = {
    count: 0
};

export const homeStoreProvider = createStore({ default: defaultHomeState });
export const homeStoreToken = homeStoreProvider.token;
export const useHomeStore = () => resolve(homeStoreToken)();

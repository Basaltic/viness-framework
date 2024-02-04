import { ValueProvider, token } from '@viness/core';
import { UIStore } from './ui-store';
import { StateOption } from './ui-store.protocol';

/**
 *
 * @param option
 * @returns
 */
export function createStore<StateValue extends object>(option: StateOption<StateValue>): ValueProvider<UIStore<StateValue>> {
    const storeToken = token<UIStore<StateValue>, any>(option.name || '');

    const store = new UIStore<StateValue>(option);

    return { token: storeToken, useValue: store };
}

import { InjectionToken } from '@viness/core';
import { UIStore } from './ui-store';
import { StateOption } from './ui-store.protocol';

/**
 *
 * @param option
 * @returns
 */
export function createStore<StateValue extends object>(option: StateOption<StateValue>) {
    const token = Symbol(option.name) as InjectionToken<UIStore<StateValue>>;

    const store = new UIStore<StateValue>(option);

    return { token, useValue: store };
}

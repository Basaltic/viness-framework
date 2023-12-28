import { InjectionToken } from '@viness/core';
import { UIState } from './ui-state';
import { StateOption } from './ui-state.protocol';

/**
 *
 * @param option
 * @returns
 */
export function createUIState<StateValue extends object>(option: StateOption<StateValue>) {
    const token = Symbol(option.name) as InjectionToken<UIState<StateValue>>;

    const state = new UIState<StateValue>(option);

    return { token, useValue: state };
}

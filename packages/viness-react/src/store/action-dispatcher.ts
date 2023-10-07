import { IVinessApp, Injectable, VinessApp, createInjectDecorator } from '@viness/core';
import { IAction, IActionHandler, IActionMetadata } from './action.protocol';
import { ACTION_METADATA } from './constants';

export const IActionDispatcher = createInjectDecorator<ActionDispatcher>('VinessActionBus');

@Injectable({ id: IActionDispatcher })
export class ActionDispatcher {
    constructor(@IVinessApp private context: VinessApp) {}

    dispatch<T extends IAction, R = any>(action: T): Promise<R> {
        const { constructor: actionType } = Object.getPrototypeOf(action);

        const { id } = Reflect.getMetadata(ACTION_METADATA, actionType) as IActionMetadata;
        const token = createInjectDecorator(id);

        const handler = this.context.resolve(token) as IActionHandler<T>;

        return handler.execute(action);
    }
}

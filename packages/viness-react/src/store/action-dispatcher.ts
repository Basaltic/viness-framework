import { Injectable } from '../app';
import { ContaienrUtil } from '../container';
import { createToken } from '../token';
import { IAction, IActionHandler, IActionMetadata } from './action.protocol';
import { ACTION_METADATA } from './constants';

export const IActionDispatcher = createToken<ActionDispatcher>('VinessActionBus');

@Injectable({ token: IActionDispatcher })
export class ActionDispatcher {
    dispatch<T extends IAction, R = any>(action: T): Promise<R> {
        const { constructor: actionType } = Object.getPrototypeOf(action);

        const { id } = Reflect.getMetadata(ACTION_METADATA, actionType) as IActionMetadata;
        const token = createToken(id);

        const handler = ContaienrUtil.resolve(token) as IActionHandler<T>;

        return handler.execute(action);
    }
}

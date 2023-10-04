import { Injectable } from '../app';
import { ContaienrUtil } from '../container';
import { createToken } from '../token';
import { IAction, IActionHandler, IActionMetadata } from './action.protocol';
import { ACTION_METADATA } from './constants';

export const IActionBus = createToken<ActionBus>('VinessActionBus');

@Injectable({ token: IActionBus })
export class ActionBus {
    dispatch<T extends IAction, R = any>(action: T): Promise<R> {
        const { constructor: actionType } = Object.getPrototypeOf(action);

        const { id } = Reflect.getMetadata(ACTION_METADATA, actionType) as IActionMetadata;
        const token = createToken(id);

        console.log(id, token);

        const handler = ContaienrUtil.resolve(token) as IActionHandler<T>;

        return handler.execute(action);
    }
}

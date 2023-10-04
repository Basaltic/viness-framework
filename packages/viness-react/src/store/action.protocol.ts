import { InjectableServiceId } from '../token';

export interface IAction {}

export interface IActionHandler<A extends IAction, R = any> {
    execute(action: A): Promise<R> | R;
}

export interface IActionMetadata {
    id: InjectableServiceId;
    token?: any;
}

import { ServiceId, ServiceIdentifier } from '@viness/core';

export interface IAction {}

export interface IActionHandler<A extends IAction, R = any> {
    execute(action: A): Promise<R> | R;
}

export interface IActionMetadata {
    id: ServiceId | ServiceIdentifier<any>;
}

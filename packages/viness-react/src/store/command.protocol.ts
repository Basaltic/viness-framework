import { InjectionToken, ServiceIdentifier } from '@viness/core';

export interface ICommand {}

export interface ICommandHandler<A extends ICommand, R = any> {
    execute(action: A): Promise<R> | R;
}

export interface ICommandMetadata {
    id: InjectionToken | ServiceIdentifier<any>;
}

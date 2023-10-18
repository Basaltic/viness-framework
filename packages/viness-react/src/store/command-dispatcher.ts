import { IVinessApp, Injectable, VinessApp, createInjectDecorator } from '@viness/core';
import { ICommand, ICommandHandler, ICommandMetadata } from './command.protocol';
import { COMMAND_METADATA } from './constants';

export const commandDispatcherToken = Symbol('VinessActionBus');

@Injectable({ token: commandDispatcherToken })
export class CommandDispatcher {
    constructor(@IVinessApp private context: VinessApp) {}

    dispatch<T extends ICommand, R = any>(action: T): Promise<R> {
        const { constructor: actionType } = Object.getPrototypeOf(action);

        const { id } = Reflect.getMetadata(COMMAND_METADATA, actionType) as ICommandMetadata;
        const token = createInjectDecorator(id);

        const handler = this.context.resolve(token) as ICommandHandler<T>;

        return handler.execute(action);
    }
}

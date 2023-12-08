import { Injectable, VinessApp } from '@viness/core';
import { ICommand, ICommandHandler, ICommandMetadata } from './command.protocol';
import { COMMAND_METADATA } from './constants';

@Injectable()
export class CommandDispatcher {
    constructor() {}

    dispatch<T extends ICommand, R = any>(action: T) {
        // const { constructor: actionType } = Object.getPrototypeOf(action);
        // const { id } = Reflect.getMetadata(COMMAND_METADATA, actionType) as ICommandMetadata;
        // const token = createInjectDecorator(id);
        // const handler = this.context.resolve(token) as ICommandHandler<T>;
        // return handler.execute(action);
    }
}

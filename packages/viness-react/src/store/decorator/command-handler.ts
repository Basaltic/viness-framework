import { Injectable } from '@viness/core';
import { Newable } from '../../types';
import { ICommand } from '../command.protocol';
import { COMMAND_METADATA } from '../constants';

/**
 *
 */
export function CommandHandler<T>(action: ICommand | Newable<ICommand>): ClassDecorator {
    return (target: any) => {
        // relate the action & handler

        const token = Symbol('action');

        if (!Reflect.hasOwnMetadata(COMMAND_METADATA, action)) {
            Reflect.defineMetadata(COMMAND_METADATA, { token }, action);
        }

        return Injectable({ token })(target);
    };
}

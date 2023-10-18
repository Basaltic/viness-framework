import { Injectable } from '@viness/core';
import { HANDLER_COMMANDS } from '../constants';

export type HandlerMetadata = {};

export function Handler(metadata: HandlerMetadata): ClassDecorator {
    return (target) => {
        const commands = Reflect.getOwnMetadata(HANDLER_COMMANDS, target);

        console.log(commands);

        return Injectable()(target);
    };
}

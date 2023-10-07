import { Injectable } from '@viness/core';
import { Newable } from '../types';
import { IAction } from './action.protocol';
import { ACTION_METADATA } from './constants';

/**
 *
 */
export function ActionHandler<T>(action: IAction | Newable<IAction>): ClassDecorator {
    return (target: any) => {
        // relate the action & handler

        const id = Symbol('action');

        if (!Reflect.hasOwnMetadata(ACTION_METADATA, action)) {
            Reflect.defineMetadata(ACTION_METADATA, { id }, action);
        }

        return Injectable({ id })(target);
    };
}

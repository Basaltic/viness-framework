import { MODULE_METADATA } from '../constants';
import { ModuleMetadata } from './module.protocol';

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target) => {
        if (!Reflect.getOwnMetadata(MODULE_METADATA, target)) {
            Reflect.defineMetadata(MODULE_METADATA, metadata, target);
        }
    };
}

import { MODULE_METADATA } from '../instantiation/constants';
import { ModuleMetadata } from '../module/module.protocol';

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target) => {
        if (!Reflect.getOwnMetadata(MODULE_METADATA, target)) {
            Reflect.defineMetadata(MODULE_METADATA, metadata, target);
        }
    };
}

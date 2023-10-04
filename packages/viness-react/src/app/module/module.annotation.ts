import { ModuleMetadata } from './module.protocol';

export const MODULE_METADATA = '$viness:module_metadata';

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target) => {
        if (!Reflect.getOwnMetadata(MODULE_METADATA, target)) {
            Reflect.defineMetadata(MODULE_METADATA, metadata, target);
        }
    };
}

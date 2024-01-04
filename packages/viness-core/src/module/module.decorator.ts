import { MODULE_METADATA } from '../constants';
import { DynamicModule, ModuleMetadata } from './module.protocol';

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target) => {
        if (!Reflect.getOwnMetadata(MODULE_METADATA, target)) {
            Reflect.defineMetadata(MODULE_METADATA, metadata, target);
        }
    };
}

export function createModule(metadata: ModuleMetadata): DynamicModule {
    return metadata;
}

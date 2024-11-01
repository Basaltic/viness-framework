import { Module, ModuleMetadata } from './module.protocol';

export function createModule(metadata: ModuleMetadata): Module {
    return metadata;
}

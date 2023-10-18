import { SyncDescriptor } from '../instantiation/descriptors';
import { InjectionToken, ServiceIdentifier } from '../instantiation/service-identifier';
import { Type } from '../types';

export type ClassProvider<T> = {
    provide: ServiceIdentifier<T> | InjectionToken;
    useClass: Type<T> | SyncDescriptor<T>;
};

export type ModuleProvider<T = any> = Type<any> | ClassProvider<T>;

export type ModuleImport = Type<any> | DynamicModule<any>;

export interface ModuleMetadata {
    imports?: ModuleImport[];
    providers?: ModuleProvider[];
    stores?: any[];
    handlers?: any[];
}

export interface DynamicModule<T = any> extends ModuleMetadata {
    module: Type<T>;
}

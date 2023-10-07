import { SyncDescriptor } from '../instantiation/descriptors';
import { ServiceId, ServiceIdentifier } from '../instantiation/service-identifier';

export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}

export type ClassProvider<T> = {
    provide: ServiceIdentifier<T> | ServiceId;
    useClass: Type<T> | SyncDescriptor<T>;
};

export type ModuleProvider<T = any> = Type<any> | ClassProvider<T>;

export type ModuleImport = Type<any> | DynamicModule<any>;

export interface ModuleMetadata {
    imports?: ModuleImport[];
    providers?: ModuleProvider[];
}

export interface DynamicModule<T = any> extends ModuleMetadata {
    module: Type<T>;
}

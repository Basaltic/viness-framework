import { Newable } from '../types';
import { interfaces } from 'inversify';

export type InjectionToken<T = any> = interfaces.ServiceIdentifier<T>;

export type ClassProvider<T> = { provide?: InjectionToken; useClass: Newable<T> };
export type ValueProvider<T> = { provide: InjectionToken; useValue: T };
export type FactoryProvider<T> = { provide: InjectionToken; useFactory: interfaces.FactoryCreator<any, any, any> };

export type ModuleProvider<T = any> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T> | Newable<T>;

export interface ModuleMetadata {
    imports?: ModuleImport[];
    providers?: ModuleProvider[];
}

export interface DynamicModule<T = any> extends ModuleMetadata {
    module: Newable<T>;
}

export type ModuleImport = Newable<any> | DynamicModule<any>;

export function isClassProvider<T>(provider: ModuleProvider<T>): provider is ClassProvider<any> {
    return !!(provider as ClassProvider<T>).useClass;
}

export function isValueProvider<T>(provider: ModuleProvider<T>): provider is ValueProvider<any> {
    return !!(provider as ValueProvider<T>).useValue;
}

export function isFactoryProvider<T>(provider: ModuleProvider<T>): provider is FactoryProvider<any> {
    return !!(provider as FactoryProvider<T>).useFactory;
}

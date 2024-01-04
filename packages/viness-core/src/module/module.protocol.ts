import { Newable } from '../types';
import * as di from '@viness/di';

export type ClassProvider<T> = di.ClassProvider<T> & { token: di.InjectionToken<T> };
export type ValueProvider<T> = di.ValueProvider<T> & { token: di.InjectionToken<T> };
export type TokenProvider<T> = di.TokenProvider<T>;
export type FactoryProvider<T> = di.FactoryProvider<T> & { token: di.InjectionToken; cache: boolean };

export type ModuleProvider<T = any> = ClassProvider<T> | ValueProvider<T> | TokenProvider<T> | FactoryProvider<T> | Newable<T>;

export type ModuleImport = Newable<any> | DynamicModule<any>;

export interface ModuleMetadata {
    imports?: ModuleImport[];
    providers?: ModuleProvider[];
}

export interface DynamicModule<T = any> extends ModuleMetadata {
    module?: Newable<T>;
}

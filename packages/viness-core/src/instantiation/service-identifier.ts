import { Type } from '../types';

/**
 * Identifies a service of type `T`.
 */
export interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

export type InjectionToken<T = any> = string | Symbol | Type<T>;

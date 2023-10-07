/**
 * Identifies a service of type `T`.
 */
export interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}

export type ServiceInstanceIdentifier = string | number;

export type ServiceId = string | Symbol;

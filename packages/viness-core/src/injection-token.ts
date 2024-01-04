import * as di from '@viness/di';

export type InjectionToken<T> = di.InjectionToken<T>;

/**
 * Create Injection Token
 */
export function createInjectionToken<T>() {
    const token = Symbol();

    return token as InjectionToken<T>;
}

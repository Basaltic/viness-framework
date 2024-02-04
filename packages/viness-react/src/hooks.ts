import { Token, resolve } from '@viness/core';

/**
 * resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T = any>(token: Token<T>, ...args: any): T {
    return resolve<T, any>(token)(args as any) as T;
}

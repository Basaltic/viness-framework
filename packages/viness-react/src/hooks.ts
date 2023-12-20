import { useAppContext } from './app/app-react-context';
import { InjectionToken } from '@viness/core';

/**
 * Resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T>(token: InjectionToken<T>): T {
    const app = useAppContext();
    return app.container.resolve(token);
}

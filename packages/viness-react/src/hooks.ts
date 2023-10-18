import { useAppContext } from './app/app-react-context';
import { InjectionToken, ServiceIdentifier } from '@viness/core';

/**
 * Resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T>(id: InjectionToken | ServiceIdentifier<T>): T {
    const app = useAppContext();
    return app.resolve(id) as T;
}

import { ServiceIdentifier } from '@viness/di'
import { container } from './app/container'

/**
 * Resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T>(id: ServiceIdentifier<T>): T {
    return container.resolve(id)
}

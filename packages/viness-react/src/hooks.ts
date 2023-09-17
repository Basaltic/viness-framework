import { ServiceIdentifier } from '@viness/di'
import { ContaienrUtil } from './app/container'

/**
 * Resolve service instance in component
 *
 * @param id
 * @returns
 */
export function useResolve<T>(id: ServiceIdentifier<T>): T {
    return ContaienrUtil.get(id)
}

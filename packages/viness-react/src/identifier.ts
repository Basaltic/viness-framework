import { createDecorator, ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { servicesContainer } from './app/container'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {
    /**
     * call it in any services
     *
     * @param instanceId
     * @returns
     */
    resolve: (instanceId?: ServiceInstanceIdentifier) => T

    /**
     * resolve the instance
     * - call it in FC
     *
     * @param instanceId
     * @returns
     */
    useResolve: (instanceId?: ServiceInstanceIdentifier) => T
}

/**
 * create service decorator as identifier
 *
 * @param serviceId
 * @returns
 */
export function createIdentifier<T>(serviceId: string): VinessServiceIdentifier<T> {
    serviceId = `${serviceId}_${generateId()}`
    const identifier = createDecorator(serviceId) as VinessServiceIdentifier<T>

    identifier.resolve = (instanceId) => servicesContainer.resolve(identifier, instanceId)
    identifier.useResolve = (instanceId) => servicesContainer.resolve(identifier, instanceId)

    return identifier
}

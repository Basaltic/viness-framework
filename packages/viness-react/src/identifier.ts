import { createDecorator, ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { servicesContainer } from './app/container'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {
    /**
     * call it in anywhere
     *
     * @param instanceId
     * @returns
     */
    resolve: (instanceId?: ServiceInstanceIdentifier) => T

    /**
     * call it in FC
     *
     * @param instanceId
     * @returns
     */
    use: (instanceId?: ServiceInstanceIdentifier) => T
}

/**
 * create service identifier
 *
 * @param serviceId
 * @returns
 */
export function createIdentifier<T>(serviceId: string): VinessServiceIdentifier<T> {
    serviceId = `${serviceId}_${generateId()}`
    const identifier = createDecorator(serviceId) as VinessServiceIdentifier<T>

    identifier.resolve = (instanceId) => servicesContainer.get(identifier, instanceId)
    identifier.use = (instanceId) => servicesContainer.get(identifier, instanceId)

    return identifier
}

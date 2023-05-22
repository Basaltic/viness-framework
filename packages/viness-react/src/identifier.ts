import { createDecorator, ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { servicesContainer } from './container'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {
    /**
     * call this hook function to inject the service in react fc component
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

    identifier.use = (instanceId) => servicesContainer.get(identifier, instanceId)

    return identifier
}

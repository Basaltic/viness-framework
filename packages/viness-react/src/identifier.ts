import { createDecorator, ServiceIdentifier, ServiceInstanceIdentifier } from '@viness/di'
import { effectsContainer } from './container'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {
    get: (instanceId?: ServiceInstanceIdentifier) => T
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

    identifier.get = (instanceId) => effectsContainer.get(identifier, instanceId)

    return identifier
}

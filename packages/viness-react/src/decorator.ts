import { createDecorator as createDecoratorInner, ServiceIdentifier } from '@viness/di'
import { generateId } from './utils'

export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {}

/**
 * create service decorator as identifier
 *
 * @param serviceId
 * @returns
 */
export function createDecorator<T>(serviceId: string): VinessServiceIdentifier<T> {
    serviceId = `${serviceId}_${generateId()}`
    const identifier = createDecoratorInner(serviceId) as VinessServiceIdentifier<T>

    return identifier
}

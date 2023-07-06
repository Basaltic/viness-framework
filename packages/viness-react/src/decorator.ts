import { createDecorator as createDecoratorInner, ServiceIdentifier } from '@viness/di'

// = PropertyDecorator & ParameterDecorator
// export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {}

export type VinessServiceIdentifier<T> = ServiceIdentifier<T>

/**
 * create service decorator as identifier
 *
 * @param serviceId
 * @returns
 */
export function createDecorator<T>(serviceName: string): VinessServiceIdentifier<T> {
    const serviceDecorator = createDecoratorInner(serviceName) as VinessServiceIdentifier<T>

    return serviceDecorator
}

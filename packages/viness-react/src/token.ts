import { createDecorator as createDecoratorInner, ServiceIdentifier } from '@viness/di'

// = PropertyDecorator & ParameterDecorator
// export interface VinessServiceIdentifier<T> extends ServiceIdentifier<T> {}

export type VinessServiceToken<T> = ServiceIdentifier<T>

/**
 * create service token
 *
 * @param serviceId
 * @returns
 */
export function createToken<T>(serviceName: string): VinessServiceToken<T> {
    return createDecoratorInner(serviceName) as VinessServiceToken<T>
}

import { createDecorator as createDecoratorInner, ServiceIdentifier } from '@viness/di'

export type VinessInjectionToken<T> = ServiceIdentifier<T>

/**
 * create service token
 *
 * @param serviceId
 * @returns
 */
export function createToken<T>(serviceName: string): VinessInjectionToken<T> {
    return createDecoratorInner(serviceName) as VinessInjectionToken<T>
}

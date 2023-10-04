import { createDecorator, ServiceIdentifier } from '@viness/di';

export type InjectableServiceId = string | Symbol;

/**
 *
 */
export type VinessInjectionToken<T = any> = ServiceIdentifier<T> & {};

/**
 * create service token
 *
 * @param serviceId
 * @returns
 */
export function createToken<T>(serviceId: string | Symbol): VinessInjectionToken<T> {
    const token = createDecorator(serviceId) as VinessInjectionToken<T>;

    return token;
}

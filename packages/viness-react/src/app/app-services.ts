import { ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { createIdentifier, VinessServiceIdentifier } from '../identifier'
import { servicesContainer } from './container'

/**
 * Register a new service in the container
 *
 * @param service
 * @param identifier
 * @param isLazyInit
 * @returns
 */
export function registerService<T, Services extends {}[]>(
    service: SyncDescriptor<any> | (new (...services: Services) => T),
    identifier?: VinessServiceIdentifier<T>,
    isLazyInit: boolean = true
): VinessServiceIdentifier<T> {
    const supportType = isLazyInit ? 1 : 0

    if (!identifier) {
        // @ts-ignore
        identifier = createIdentifier(service?.name || service?.ctor?.name)
    }

    servicesContainer.register(identifier, service, supportType)
    return identifier
}

/**
 * Resolve service instance by id
 *
 * @param {ServiceIdentifier<T>} service identifier
 * @returns {T} service instance
 */
export function resolveService<T>(id: ServiceIdentifier<T>) {
    return servicesContainer.resolve(id)
}

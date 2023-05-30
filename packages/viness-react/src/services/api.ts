import { ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { createDecorator, VinessServiceIdentifier } from '../decorator'
import { container } from '../app/container'

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
        identifier = createDecorator(service?.name || service?.ctor?.name)
    }

    container.register(identifier, service, supportType)
    return identifier
}

/**
 * Resolve service instance by id
 *
 * @param {ServiceIdentifier<T>} service identifier
 * @returns {T} service instance
 */
export function resolveService<T>(id: ServiceIdentifier<T>) {
    return container.resolve(id)
}

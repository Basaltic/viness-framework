import { ServiceIdentifier } from '@viness/di'
import { servicesContainer } from './container'
import { createIdentifier, VinessServiceIdentifier } from './identifier'

export const IServices = createIdentifier<Services>('IServiceContainer')

export class Services {
    /**
     * add new service to app
     */
    bind<T, Services extends {}[]>(
        service: new (...services: Services) => T,
        identifier?: VinessServiceIdentifier<T>,
        isLazyInit: boolean = true
    ): VinessServiceIdentifier<T> {
        const supportType = isLazyInit ? 1 : 0

        if (!identifier) {
            identifier = createIdentifier(service.name)
        }

        servicesContainer.register(identifier, service, supportType)
        return identifier
    }

    /**
     * get service instance by id
     *
     * @param {ServiceIdentifier<T>} service identifier
     * @returns {T} service instance
     */
    get<T>(id: ServiceIdentifier<T>) {
        return servicesContainer.get(id)
    }
}

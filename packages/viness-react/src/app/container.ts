import { BrandedService, Container, InstantiationType, ServiceIdentifier, SyncDescriptor } from '@viness/di'

export const container: Container = new Container()

export class ContaienrUtil {
    static register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation?: InstantiationType
    ): void {
        container.register(id, ctorOrDescriptor, supportsDelayedInstantiation || 1)
    }

    static get<T>(identifier: ServiceIdentifier<T>) {
        return container.resolve(identifier)
    }
}

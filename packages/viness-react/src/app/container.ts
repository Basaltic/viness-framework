import { BrandedService, Container, InstantiationType, ServiceIdentifier, SyncDescriptor } from '@viness/di'

export let container: Container = new Container()

export class ContaienrUtil {
    static getContainer() {
        return container
    }

    static setContainer(container: Container) {
        container = container
    }

    static register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation?: InstantiationType
    ): void {
        container.register(id, ctorOrDescriptor, supportsDelayedInstantiation)
    }
}

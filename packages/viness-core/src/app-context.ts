import { createInjectDecorator } from './decorator';
import { BrandedService, Container, InstantiationType, ServiceId, ServiceIdentifier, SyncDescriptor } from './instantiation';

export const IAppContext = createInjectDecorator<AppContext>('IAppContext');

export class AppContext {
    constructor(private container: Container) {}

    register<T, Services extends BrandedService[]>(
        serviceId: ServiceId | ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation?: InstantiationType
    ): void {
        const id = createInjectDecorator(serviceId);
        this.container.register(id, ctorOrDescriptor, supportsDelayedInstantiation || 1);
    }

    resolve<T>(serviceId: ServiceId | ServiceIdentifier<T>) {
        return this.container.resolve(serviceId);
    }
}

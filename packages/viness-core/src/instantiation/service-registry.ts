import { SyncDescriptor } from './descriptors';
import type { BrandedService } from './instantiation.interface';
import { ServiceCollection } from './service-collection';
import { ServiceIdentifier } from './service-identifier';

export const enum InstantiationType {
    /**
     * Instantiate this service as soon as a consumer depdends on it. _Note_ that this
     * is more costly as some upfront work is done that is likely not needed
     */
    Eager = 0,

    /**
     * Instantiate this service as soon as a consumer uses it. This is the _better_
     * way of registering a service.
     */
    Delayed = 1
}

export interface IServiceRegistry {
    register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctor: new (...services: Services) => T,
        supportsDelayedInstantiation?: InstantiationType
    ): void;
    register<T, Services extends BrandedService[]>(id: ServiceIdentifier<T>, descriptor: SyncDescriptor<any>): void;
    register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: { new (...services: Services): T } | SyncDescriptor<any>,
        supportsDelayedInstantiation?: InstantiationType
    ): void;
}

/**
 * Manage the registered service
 */
export class ServiceRegistry implements IServiceRegistry {
    private descriptorCollection: ServiceCollection = new ServiceCollection();

    register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation?: InstantiationType
    ): void {
        if (!(ctorOrDescriptor instanceof SyncDescriptor)) {
            ctorOrDescriptor = new SyncDescriptor<T>(
                ctorOrDescriptor as new (...args: any[]) => T,
                [],
                Boolean(supportsDelayedInstantiation)
            );
        }

        this.descriptorCollection.set(id, ctorOrDescriptor);
    }

    getServiceCollection() {
        return this.descriptorCollection;
    }

    merge(registry: ServiceRegistry) {
        this.descriptorCollection.merge(registry.getServiceCollection());
    }
}

import { SyncDescriptor } from './descriptors';
import { BrandedService, IInstantiationService } from './instantiation.interface';
import { InstantiationService } from './instantiation-service';
import { InstantiationType, ServiceRegistry } from './service-registry';
import { ServiceId, ServiceIdentifier } from './service-identifier';
import { createInjectDecorator } from '../decorator';
import { Type } from '../types';

export class Container {
    private registory: ServiceRegistry;
    private instantiationService: IInstantiationService;

    constructor(serviceRegistory?: ServiceRegistry, instantiation?: IInstantiationService) {
        const registory = serviceRegistory ? serviceRegistory : new ServiceRegistry();

        const serviceCollection = registory.getServiceCollection();
        const instantiationService = instantiation ? instantiation : new InstantiationService(serviceCollection, true);

        this.registory = registory;
        this.instantiationService = instantiationService;
    }

    /**
     * Create child container of this container
     * @returns {Container} new child container instance
     */
    createChild(): Container {
        const serviceRegistory = new ServiceRegistry();
        const serviceCollection = serviceRegistory.getServiceCollection();
        const instantiationService = this.instantiationService.createChild(serviceCollection);

        return new Container(serviceRegistory, instantiationService);
    }

    /**
     * Register new Service to the container
     * @param id
     * @param ctorOrDescriptor
     * @param supportsDelayedInstantiation
     */
    register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation: InstantiationType = InstantiationType.Delayed
    ): void {
        this.registory.register(id, ctorOrDescriptor, supportsDelayedInstantiation);
    }

    /**
     * Get service instance by identifier
     *
     * @param serviceId
     * @param instanceId
     * @returns
     */
    resolve<T>(serviceId: ServiceIdentifier<T> | ServiceId | Type<T>): T {
        const id = createInjectDecorator<T>(serviceId);
        return this.instantiationService.invokeFunction((accessor) => accessor.get(id));
    }

    /**
     * Check if the service is registered
     *
     * @param id
     * @returns
     */
    has<T>(id: ServiceIdentifier<T>) {
        return this.registory.getServiceCollection().has(id);
    }

    /**
     * Get Service Descriptor
     *
     * @param id
     * @returns
     */
    getDescriptor<T>(id: ServiceIdentifier<T>) {
        return this.registory.getServiceCollection().get(id);
    }
}

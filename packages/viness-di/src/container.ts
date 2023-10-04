import { SyncDescriptor } from './descriptors';
import { BrandedService, IInstantiationService, ServiceIdentifier, ServiceInstanceIdentifier } from './instantiation';
import { InstantiationService } from './instantiation-service';
import { InstantiationType, ServiceRegistry } from './service-registry';

export class Container {
    private registory: ServiceRegistry;
    private instantiationService: IInstantiationService;

    private serviceIdToInstanceIdMap: Map<ServiceIdentifier<any>, Map<ServiceInstanceIdentifier, ServiceIdentifier<any>>>;

    constructor(serviceRegistory?: ServiceRegistry, instantiation?: IInstantiationService) {
        const registory = serviceRegistory ? serviceRegistory : new ServiceRegistry();

        const serviceCollection = registory.getServiceCollection();
        const instantiationService = instantiation ? instantiation : new InstantiationService(serviceCollection, true);

        this.registory = registory;
        this.instantiationService = instantiationService;
        this.serviceIdToInstanceIdMap = new Map();
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
     * @param id
     * @param instanceId
     * @returns
     */
    resolve<T>(id: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier): T {
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

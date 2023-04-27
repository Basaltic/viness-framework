import { SyncDescriptor } from './descriptors'
import { BrandedService, createDecorator, ServiceIdentifier, ServiceInstanceIdentifier } from './instantiation'
import { InstantiationService } from './instantiation-service'
import { ServiceCollection } from './service-collection'
import { InstantiationType, ServiceRegistry } from './service-registry'

export class Container {
    private registory: ServiceRegistry
    private instantiationService: InstantiationService

    private serviceIdToInstanceIdMap: Map<
        ServiceIdentifier<any>,
        Map<ServiceInstanceIdentifier, ServiceIdentifier<any>>
    >

    constructor() {
        const registory = new ServiceRegistry()

        const serviceCollection = registory.getServiceCollection()
        const instantiationService = new InstantiationService(serviceCollection, true)

        this.registory = registory
        this.instantiationService = instantiationService
        this.serviceIdToInstanceIdMap = new Map()
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
        this.registory.register(id, ctorOrDescriptor, supportsDelayedInstantiation)
    }

    /**
     * Get service instance by identifier
     *
     * @param id
     * @param instanceId
     * @returns
     */
    get<T>(id: ServiceIdentifier<T>, instanceId?: ServiceInstanceIdentifier): T {
        // construct a new service identifier
        if (instanceId) {
            let serviceIdToInstanceIds = this.serviceIdToInstanceIdMap.get(id)
            if (!serviceIdToInstanceIds) {
                serviceIdToInstanceIds = new Map()
                this.serviceIdToInstanceIdMap.set(id, serviceIdToInstanceIds)
            }

            const serviceInstanceIdentifier = serviceIdToInstanceIds.get(instanceId)
            if (serviceInstanceIdentifier) {
                return this.instantiationService.invokeFunction((accessor) => accessor.get(serviceInstanceIdentifier))
            } else {
                const serviceDesc = this.registory.getServiceDescriptorCollection().get(id) as SyncDescriptor<any>
                const serviceInstanceIdentifier = createDecorator<T>(`${id.toString()}_${instanceId}`)
                serviceIdToInstanceIds.set(instanceId, serviceInstanceIdentifier)

                this.register(
                    serviceInstanceIdentifier,
                    serviceDesc.ctor,
                    serviceDesc.supportsDelayedInstantiation ? 1 : 0
                )
                return this.instantiationService.invokeFunction((accessor) => accessor.get(serviceInstanceIdentifier))
            }
        }

        return this.instantiationService.invokeFunction((accessor) => accessor.get(id))
    }

    /**
     * Check if the service is registered
     *
     * @param id
     * @returns
     */
    has<T>(id: ServiceIdentifier<T>) {
        return this.registory.getServiceCollection().has(id)
    }

    /**
     * Get Service Descriptor
     *
     * @param id
     * @returns
     */
    getDescriptor<T>(id: ServiceIdentifier<T>) {
        return this.registory.getServiceDescriptorCollection().get(id)
    }
}

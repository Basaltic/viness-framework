import { SyncDescriptor } from './descriptors'
import { BrandedService, ServiceIdentifier } from './instantiation'
import { InstantiationService } from './instantiation-service'
import { InstantiationType, ServiceRegistry } from './service-registry'

export class Container {
    private registory: ServiceRegistry
    private instantiationService: InstantiationService

    constructor() {
        const registory = new ServiceRegistry()

        const serviceCollection = registory.toServiceCollection()
        const instantiationService = new InstantiationService(serviceCollection, true)

        this.registory = registory
        this.instantiationService = instantiationService
    }

    register<T, Services extends BrandedService[]>(
        id: ServiceIdentifier<T>,
        ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
        supportsDelayedInstantiation?: InstantiationType
    ): void {
        this.registory.register(id, ctorOrDescriptor, supportsDelayedInstantiation)
    }

    get<T>(sid: ServiceIdentifier<T>) {
        return this.instantiationService.invokeFunction((accessor) => accessor.get(sid))
    }
}

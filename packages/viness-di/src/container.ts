import { ServiceIdentifier } from './instantiation'
import { InstantiationService } from './instantiation-service'
import { ServiceRegistry } from './service-registry'

export class Container {
    private registory: ServiceRegistry
    private instantiationService: InstantiationService

    constructor() {
        const registory = new ServiceRegistry()

        // registory.register(IApple, Apple)
        // registory.register(IPerson, Person)

        const serviceCollection = registory.toServiceCollection()
        const instantiationService = new InstantiationService(serviceCollection, true)

        this.registory = registory
        this.instantiationService = instantiationService
    }

    register<T>(sid: ServiceIdentifier<T>) {}

    get<T>(sid: ServiceIdentifier<T>) {
        return this.instantiationService.invokeFunction((accessor) => accessor.get(sid))
    }
}

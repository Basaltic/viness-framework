import { ServiceIdentifier, ServiceRegistry, SyncDescriptor } from '@viness/di'
import { container } from './container'

export interface IVinessModule {
    register<T>(id: ServiceIdentifier<T>, service: new (...services: any[]) => T, staticArguments?: any[]): void
    imports(module: VinessModule): void
}

/**
 * A module manages a set of services and it can import other modules
 */
export class VinessModule {
    registry: ServiceRegistry = new ServiceRegistry()
    subModules: VinessModule[] = []
    register<T>(id: ServiceIdentifier<T>, service: new (...services: any[]) => T, staticArguments?: any[]): void {
        if (staticArguments) {
            const ctor = new SyncDescriptor(service, staticArguments)
            this.registry.register(id, ctor)

            return container.register(id, ctor)
        }
        this.registry.register(id, service)
        return container.register(id, service)
    }
    imports(module: VinessModule) {
        this.subModules.push(module)
    }
}

export function createModule() {
    return new VinessModule()
}

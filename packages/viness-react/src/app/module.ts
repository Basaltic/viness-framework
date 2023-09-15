import { ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from './container'
import { INJECTABLE_ID } from '../annotation'

export interface Type<T = any> extends Function {
    new (...args: any[]): T
}

export interface ModuleOptions {
    imports?: IVinessModule[] | Type<any>[]
    providers?: Array<new (...services: any[]) => any>
}

export interface IVinessModule extends ModuleOptions {
    /**
     * Register service in this module
     *
     * @param id
     * @param service
     * @param staticArguments
     */
    register<T>(id: ServiceIdentifier<T>, service: new (...services: any[]) => T, staticArguments?: any[]): void
    /**
     * Import other modules
     *
     * @param modules
     */
    import(...modules: VinessModule[]): void
}

/**
 * A module manages a set of services and it can import other modules
 */
export class VinessModule implements IVinessModule {
    subModules: IVinessModule[] = []

    register<T>(id: ServiceIdentifier<T>, service: new (...services: any[]) => T, staticArguments?: any[]): void {
        if (staticArguments) {
            const ctor = new SyncDescriptor(service, staticArguments)
            ContaienrUtil.register(id, ctor)
        } else {
            ContaienrUtil.register(id, service)
        }
    }
    import(...modules: IVinessModule[]) {
        this.subModules.push(...modules)
    }
}

/**
 * Create a empty module
 *
 * @returns {IVinessModule}
 */
export function createModule(options?: ModuleOptions): IVinessModule {
    const module = new VinessModule()
    if (options?.providers) {
        for (const provider of options.providers) {
            if (Array.isArray(provider)) {
                const [id, service] = provider
                module.register(id, service)
            } else {
                const service = provider as any
                const id = service[INJECTABLE_ID]
                if (id) {
                    module.register(id, provider)
                }
            }
        }
    }

    return module
}

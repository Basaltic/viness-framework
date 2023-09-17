import { ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { ContaienrUtil } from '../container'
import { INJECTABLE_ID } from '../annotation'
import { VinessServiceToken } from '../../token'

interface Type<T = any> extends Function {
    new (...args: any[]): T
}

type ClassProvider<T> = {
    provide: VinessServiceToken<T>
    useClass: Type<T>
}

type Provider<T = any> = Type<any> | ClassProvider<T>

export interface ModuleMetadata {
    imports?: IVinessModule[]
    providers?: Provider[]
}

export interface IVinessModule extends ModuleMetadata {}

/**
 * A module manages a set of services and it can import other modules
 */
// export class VinessModule implements IVinessModule {
//     subModules: IVinessModule[] = []

//     register<T>(id: ServiceIdentifier<T>, service: new (...services: any[]) => T, staticArguments?: any[]): void {
//         if (staticArguments) {
//             const ctor = new SyncDescriptor(service, staticArguments)
//             ContaienrUtil.register(id, ctor)
//         } else {
//             ContaienrUtil.register(id, service)
//         }
//     }
//     import(...modules: IVinessModule[]) {
//         this.subModules.push(...modules)
//     }
// }

/**
 * Create a empty module
 *
 * @returns {IVinessModule}
 */
export function createModule(metadata?: ModuleMetadata): IVinessModule {
    const module = metadata || { imports: [], providers: [] }
    if (metadata?.providers) {
        for (const provider of metadata.providers) {
            if (typeof provider === 'function') {
                const service = provider as any
                const id = service[INJECTABLE_ID]
                if (id) {
                    ContaienrUtil.register(id, service)
                } else {
                    console.warn(`Following Class is not injectable: `, service)
                }
            } else {
                const { provide, useClass } = provider as ClassProvider<any>

                ContaienrUtil.register(provide, useClass)
            }
        }
    }

    return module
}

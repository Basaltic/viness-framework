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

type ModuleProvider<T = any> = Type<any> | ClassProvider<T>

type ModuleImport = Type<any> | IVinessModule

export interface ModuleMetadata {
    imports?: ModuleImport[]
    providers?: ModuleProvider[]
}

export interface IVinessModule extends ModuleMetadata {}

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

import { ContaienrUtil } from '../../container'
import { INJECTABLE_ID } from '../annotation'
import { ModuleMetadata, VinessModule, ModuleProvider, ClassProvider } from './module.protocol'
import { MODULE_METADATA_ID } from './module.annotation'

/**
 * Create a empty module
 *
 * @returns {IVinessModule}
 */
export function createModule(metadata?: ModuleMetadata): VinessModule {
    return new VinessModule(metadata || { imports: [], providers: [] })
}

export function registerModule(module: VinessModule) {
    if (module) {
        const { imports = [], providers = [] } = module

        batchRegisterProviders(providers)

        if (imports && imports.length > 0) {
            for (const moduleImport of imports) {
                if (moduleImport instanceof VinessModule) {
                    registerModule(moduleImport)
                } else {
                    const i = moduleImport as any
                    const importedModule = i[MODULE_METADATA_ID]
                    registerModule(importedModule)
                }
            }
        }
    }
}

function batchRegisterProviders(providers: ModuleProvider[]) {
    if (providers && providers.length > 0) {
        if (providers) {
            for (const provider of providers) {
                registerProvider(provider)
            }
        }
    }
}

function registerProvider(provider: ModuleProvider) {
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

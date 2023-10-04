import { ContaienrUtil } from '../../container';
import { INJECTABLE_METADATA, InjectableMetadata } from '../annotation';
import { ModuleMetadata, VinessModule, ModuleProvider, ClassProvider, ModuleImport } from './module.protocol';
import { MODULE_METADATA } from './module.annotation';
import { createToken } from '../../token';

/**
 * Create a empty module
 *
 * @returns {IVinessModule}
 */
export function createModule(metadata?: ModuleMetadata): VinessModule {
    return new VinessModule(metadata || { imports: [], providers: [] });
}

export function importModule(module: ModuleImport) {
    if (module) {
        let imports: ModuleImport[] = [];
        let providers: ModuleProvider[] = [];
        if (module instanceof VinessModule) {
            imports = module.imports || [];
            providers = module.providers || [];
        } else {
            const metadata = Reflect.getOwnMetadata(MODULE_METADATA, module) as ModuleMetadata;

            imports = metadata.imports || [];
            providers = metadata.providers || [];
        }

        registerProviders(providers);

        if (imports && imports.length > 0) {
            for (const moduleImport of imports) {
                importModule(moduleImport);
            }
        }
    }
}

function registerProviders(providers: ModuleProvider[]) {
    if (providers && providers.length > 0) {
        if (providers) {
            for (const provider of providers) {
                registerProvider(provider);
            }
        }
    }
}

function registerProvider(provider: ModuleProvider) {
    if (typeof provider === 'function') {
        const metadata = Reflect.getOwnMetadata(INJECTABLE_METADATA, provider) as InjectableMetadata;
        const { id, token } = metadata;

        if (token) {
            ContaienrUtil.register(token, provider);
        } else if (id) {
            const token = createToken(id);
            ContaienrUtil.register(token, provider);
        } else {
            console.warn(`Following Class is not injectable: `, provider);
        }
    } else {
        const { provide, useClass } = provider as ClassProvider<any>;
        const provideType = typeof provide;
        if (provideType === 'string' || provideType === 'symbol') {
            const token = createToken(provide as any);
            ContaienrUtil.register(token, useClass);
        } else {
            ContaienrUtil.register(provide as any, useClass);
        }
    }
}

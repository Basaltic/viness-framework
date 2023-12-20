import { MODULE_METADATA } from '../constants';
import { ModuleImport, ModuleMetadata, ModuleProvider, DynamicModule } from './module.protocol';
import { DependencyContainer, Lifecycle, isClassProvider, isFactoryProvider, isTokenProvider, isValueProvider } from '@viness/di';

/**
 * Scan the module &
 */
export class ModulesScanner {
    constructor(private container: DependencyContainer) {}

    scan(module: ModuleImport) {
        if (module) {
            let imports: ModuleImport[] = [];
            let providers: ModuleProvider[] = [];

            if ((module as DynamicModule).module) {
                imports = [...((module as DynamicModule).imports || []), (module as DynamicModule).module];
                providers = (module as DynamicModule).providers || [];
            } else {
                const metadata = Reflect.getOwnMetadata(MODULE_METADATA, module) as ModuleMetadata;

                imports = metadata.imports || [];
                providers = metadata.providers || [];
            }

            this.scanProviders(providers);

            if (imports && imports.length > 0) {
                for (const moduleImport of imports) {
                    this.scan(moduleImport);
                }
            }
        }
    }

    scanProviders(providers: ModuleProvider[]) {
        if (providers && providers.length > 0) {
            if (providers) {
                for (const provider of providers) {
                    this.scanProvider(provider);
                }
            }
        }
    }

    scanProvider(provider: ModuleProvider) {
        if (typeof provider === 'function') {
            // TODO: 可以扩展一下Injectable，可以把token放入Injectable中配置
            this.container.register(provider, provider, { lifecycle: Lifecycle.ContainerScoped });
        } else if (isClassProvider(provider)) {
            this.container.register(provider.token, provider, { lifecycle: Lifecycle.ContainerScoped });
        } else if (isValueProvider(provider)) {
            this.container.register(provider.token, provider);
        } else if (isFactoryProvider(provider)) {
            this.container.register(provider.token, provider);
        } else if (isTokenProvider(provider)) {
            this.container.register(provider.useToken, provider, { lifecycle: Lifecycle.ContainerScoped });
        }
    }
}

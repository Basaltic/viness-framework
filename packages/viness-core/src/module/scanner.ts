import { InjectableMetadata, createInjectDecorator } from '../decorator';
import { INJECTABLE_METADATA, MODULE_METADATA } from '../instantiation/constants';
import { Container } from '../instantiation';
import { ClassProvider, ModuleImport, ModuleMetadata, ModuleProvider, DynamicModule } from './module.protocol';

export class DepsScanner {
    constructor(private container: Container) {}

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
            const metadata = Reflect.getOwnMetadata(INJECTABLE_METADATA, provider) as InjectableMetadata;
            const { id } = metadata;

            const token = createInjectDecorator(id || provider);
            this.container.register(token, provider);
        } else {
            const { provide, useClass } = provider as ClassProvider<any>;
            const provideType = typeof provide;
            if (provideType === 'string' || provideType === 'symbol') {
                const token = createInjectDecorator(provide as any);
                this.container.register(token, useClass);
            } else {
                this.container.register(provide as any, useClass);
            }
        }
    }
}

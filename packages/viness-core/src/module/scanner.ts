import { Container, ContainerModule, interfaces } from 'inversify';
import { MODULE_METADATA } from '../constants';
import {
    ModuleImport,
    ModuleMetadata,
    ModuleProvider,
    DynamicModule,
    isClassProvider,
    isValueProvider,
    isFactoryProvider
} from './module.protocol';

/**
 * Scan the module &
 */
export class ModulesScanner {
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

            const containerModule = new ContainerModule(this.registerProviders(providers));
            this.container.load(containerModule);

            // this.registerProvidersInContainer(providers);

            if (imports && imports.length > 0) {
                for (const moduleImport of imports) {
                    this.scan(moduleImport);
                }
            }
        }
    }
    // registerProvidersInContainer(providers: ModuleProvider[]) {
    //     if (providers && providers.length > 0) {
    //         for (const provider of providers) {
    //             if (typeof provider === 'function') {
    //                 this.container.bind(provider).toSelf();
    //             } else if (isClassProvider(provider)) {
    //                 console.log('class binding');
    //                 this.container.bind(provider.provide || provider.useClass).to(provider.useClass);
    //             } else if (isValueProvider(provider)) {
    //                 console.log('value binding');
    //                 if (typeof provider.useValue === 'function') {
    //                     this.container.bind(provider.provide).toDynamicValue(provider.useValue);
    //                 } else {
    //                     this.container.bind(provider.provide).toConstantValue(provider.useValue);
    //                 }
    //             } else if (isFactoryProvider(provider)) {
    //                 console.log('factory binding');
    //                 this.container.bind(provider.provide).toFactory(provider.useFactory);
    //             }
    //         }
    //     }
    // }

    registerProviders(providers: ModuleProvider[]): interfaces.ContainerModuleCallBack {
        return (bind: interfaces.Bind) => {
            if (providers && providers.length > 0) {
                for (const provider of providers) {
                    if (typeof provider === 'function') {
                        bind(provider).toSelf();
                    } else if (isClassProvider(provider)) {
                        bind(provider.provide || provider.useClass).to(provider.useClass);
                    } else if (isValueProvider(provider)) {
                        if (typeof provider.useValue === 'function') {
                            bind(provider.provide).toDynamicValue(provider.useValue);
                        } else {
                            bind(provider.provide).toConstantValue(provider.useValue);
                        }
                    } else if (isFactoryProvider(provider)) {
                        bind(provider.provide).toFactory(provider.useFactory);
                    }
                }
            }
        };
    }
}

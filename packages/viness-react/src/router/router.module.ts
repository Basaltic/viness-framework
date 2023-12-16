import { Module, DynamicModule, ModuleProvider } from '@viness/core';
import { VinessRouter } from './router';
import { IRouterConfig, RouterConfigToken } from './router-config';
import { RouteObject } from 'react-router';

export interface RouterModuleConfig {
    type: 'hash' | 'browser' | 'memory';
    routes: RouteObject[];
    basename?: string;
}

@Module({})
export class RouterModule {
    static forRoot(config: RouterModuleConfig): DynamicModule {
        const { type, basename, routes } = config;
        const providers: ModuleProvider[] = [];

        const routerConfig: IRouterConfig = {
            type,
            routes,
            basename
        };

        providers.push({ provide: RouterConfigToken, useValue: routerConfig });
        providers.push({ provide: VinessRouter, useClass: VinessRouter });

        return {
            providers,
            module: RouterModule
        };
    }
}

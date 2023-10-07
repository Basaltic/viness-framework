import { SyncDescriptor, Module, DynamicModule } from '@viness/core';
import { RouterParams, VinessRouter } from './router';
import { IVinessRouter, RouterConfig } from './router.protocol';
import { convertToReactRoutes, convertToVinessRouteProviders } from './route-tree';
import { doLog } from '../utils';

@Module({})
export class RouterModule {
    static forRoot(config: RouterConfig): DynamicModule {
        const { type, basename, routeTree } = config;

        const routes = convertToReactRoutes(routeTree);
        const routeProviders = convertToVinessRouteProviders(routeTree);

        const routerParams: RouterParams = { type, routes, basename };

        doLog(routes, routeProviders);

        const descriptor = new SyncDescriptor(VinessRouter, [routerParams], true);
        routeProviders.push({ provide: IVinessRouter, useClass: descriptor });

        return {
            providers: routeProviders,
            module: RouterModule
        };
    }
}

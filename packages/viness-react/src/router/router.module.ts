import { Module, DynamicModule, ModuleProvider, InjectionToken } from '@viness/core';
import { VinessRouter } from './router';
import { IRouterConfig } from './router-config';
import { TOKEN_TO_ROUTE_META, toRouteObjects } from './route-tree';
import { VinessRoute } from './route';

export interface RouterModuleConfig {
    type: 'hash' | 'browser' | 'memory';
    routeTokens: InjectionToken<any>[];
    basename?: string;
}

// TODO: 可以支持 route 分散定义，router自动收集route，然后合并
@Module({})
export class RouterModule {
    static forRoot(config: RouterModuleConfig): DynamicModule {
        const { type, basename, routeTokens } = config;
        const providers: ModuleProvider[] = [];

        const routerConfig: IRouterConfig = { type, routes: toRouteObjects(routeTokens), basename };
        const router = new VinessRouter(routerConfig);

        providers.push({ token: VinessRouter, useValue: router });

        for (const token of routeTokens) {
            const meta = TOKEN_TO_ROUTE_META.get(token);
            if (meta) {
                providers.push({ token: token, useValue: new VinessRoute(meta, router) });
            }
        }

        return {
            providers,
            module: RouterModule
        };
    }
}

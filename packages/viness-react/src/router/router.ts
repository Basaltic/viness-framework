import { NavigateFunction, RouteObject, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import { ReactRouter } from './router.protocol';
import { PathParam } from './types';
import { toRouteObjects } from './route-tree';
import { InjectionToken, ValueProvider } from '@viness/core';
import { doLog } from '../utils';

export type RouterConfig = {
    type: 'hash' | 'browser' | 'memory';
    basename?: string;
};

/**
 * keep state of routes
 */
export class VinessRouter {
    readonly reactRouter!: ReactRouter;

    constructor(configs: RouterConfig) {
        const { type, basename } = configs;
        const routes = toRouteObjects();

        doLog('app routes: ', routes);

        let router;
        switch (type) {
            case 'memory':
                router = createMemoryRouter(routes as any, { basename });
            case 'hash':
                router = createHashRouter(routes as any, { basename });
            case 'browser':
            default:
                router = createBrowserRouter(routes as any, { basename });
        }

        this.reactRouter = router;
    }

    get basename() {
        return this.reactRouter.basename;
    }

    get state() {
        return this.reactRouter.state;
    }

    navigate: NavigateFunction = (to: any, option?: any) => {
        return this.reactRouter.navigate(to, option);
    };

    getParams<Path extends string>() {
        const router = this.reactRouter;
        const matchesLength = router.state.matches.length;
        const match = router.state.matches[matchesLength - 1];

        return match.params as { [key in PathParam<Path>]: string | null };
    }
}

export const Router_Token = Symbol('RouterConfigToken') as InjectionToken<VinessRouter>;

export function createRouterProvider(config: RouterConfig): ValueProvider<VinessRouter> {
    return {
        token: VinessRouter,
        useValue: new VinessRouter(config)
    };
}

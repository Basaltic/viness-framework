import { NavigateFunction, RouteObject, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import { IVinessRouter, ReactRouter } from './router.protocol';
import { PathParam } from './types';
import { IVinessRoute } from './route.protocol';
import { Injectable, IVinessApp, VinessApp } from '@viness/core';

export type RouterParams = {
    type: 'hash' | 'browser' | 'memory';
    routes: RouteObject[];
    basename?: string;
};

/**
 * keep state of routes
 */
@Injectable({ id: IVinessRouter })
export class VinessRouter implements IVinessRouter {
    readonly reactRouter!: ReactRouter;

    constructor(configs: RouterParams, @IVinessApp private context: VinessApp) {
        const { type, routes, basename } = configs;

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

    get navigate(): NavigateFunction {
        return this.reactRouter.navigate;
    }

    getParams<Path extends string>() {
        const router = this.reactRouter;
        const matchesLength = router.state.matches.length;
        const match = router.state.matches[matchesLength - 1];

        console.log(match);

        return match.params as { [key in PathParam<Path>]: string | null };
    }

    getRoute<Path extends string = any>() {
        const router = this.reactRouter;
        const matchesLength = router.state.matches.length;
        const match = router.state.matches[matchesLength - 1];

        const routeObject = match.route as any;
        const vinessRoute = this.context.resolve(routeObject.token) as IVinessRoute<Path>;

        return vinessRoute;
    }
}

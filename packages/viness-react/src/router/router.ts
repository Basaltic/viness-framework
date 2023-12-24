import { NavigateFunction, RouteObject, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import { IVinessRouter, ReactRouter } from './router.protocol';
import { PathParam } from './types';

export type RouterParams = {
    type: 'hash' | 'browser' | 'memory';
    routes: RouteObject[];
    basename?: string;
};

/**
 * keep state of routes
 */
export class VinessRouter implements IVinessRouter {
    readonly reactRouter!: ReactRouter;

    constructor(configs: RouterParams) {
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

        return match.params as { [key in PathParam<Path>]: string | null };
    }

    // getRoute<Path extends string = any>() {
    //     const router = this.reactRouter;
    //     const matchesLength = router.state.matches.length;
    //     const match = router.state.matches[matchesLength - 1];

    //     const routeObject = match.route as any;
    //     const vinessRoute = this.app.container.resolve(routeObject.token) as IVinessRoute<Path>;

    //     return vinessRoute;
    // }
}

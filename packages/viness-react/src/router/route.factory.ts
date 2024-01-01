import { ClassProvider, Inject, Injectable, InjectionToken } from '@viness/core';
import { VinessRouteMetadata } from './route.protocol';
import { TOKEN_TO_ROUTE_META, ROOT_ROUTE_TOKENS, PARENT_ROUTE_TO_CHILD_ROUTES } from './route-tree';
import { VinessRoute } from './route';
import { VinessRouter } from './router';

/**
 * Create Route Token with extra metadata
 *
 * @param path
 * @param metadata
 * @returns
 */
export function createRouteProvider<Path extends string>(path: Path, metadata?: Omit<VinessRouteMetadata<Path>, 'path'>) {
    // generate an id to make sure the service id unique
    const token = Symbol(path) as InjectionToken<VinessRoute<Path>>;

    const fullMetadata = { ...(metadata || {}), path };

    TOKEN_TO_ROUTE_META.set(token, fullMetadata);

    // 1. no-parent: this route is in the route
    // 2. has-parent: put this route to the child route list
    if (metadata && metadata.parent) {
        const childRoutes = PARENT_ROUTE_TO_CHILD_ROUTES.get(metadata.parent);
        if (childRoutes) {
            childRoutes.push(token);
        } else {
            PARENT_ROUTE_TO_CHILD_ROUTES.set(metadata.parent, [token]);
        }
    } else {
        ROOT_ROUTE_TOKENS.push(token);
    }

    @Injectable()
    class CustomVinessRoute<Path extends string> extends VinessRoute<Path> {
        constructor(@Inject(VinessRouter) router: VinessRouter) {
            super(token, metadata as any, router);
        }
    }

    return { token, useClass: CustomVinessRoute } as ClassProvider<VinessRoute<Path>>;
}

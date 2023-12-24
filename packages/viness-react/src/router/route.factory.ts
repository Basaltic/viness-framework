import { InjectionToken } from '@viness/core';
import { VinessRouteMetadata, IVinessRoute } from './route.protocol';
import { TOKEN_TO_ROUTE_META, ROOT_ROUTES, PARENT_ROUTE_TO_CHILD_ROUTES } from './route-tree';

/**
 * Create Route Token with extra metadata
 *
 * @param path
 * @param metadata
 * @returns
 */
export function createRouteToken<Path extends string>(
    path: Path,
    metadata?: Omit<VinessRouteMetadata<Path>, 'path'>
): InjectionToken<IVinessRoute<Path>> {
    // generate an id to make sure the service id unique
    const id = Symbol(path);
    const token: InjectionToken<IVinessRoute<Path>> = id;

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
        ROOT_ROUTES.push(token);
    }

    return token;
}

import { InjectionToken } from '@viness/core';
import { VinessRouteMetadata } from './route.protocol';
import { RouteObject } from 'react-router-dom';
import { VinessRoute } from './route';

export const TOKEN_TO_ROUTE_META = new Map<InjectionToken<VinessRoute<any>>, VinessRouteMetadata<any> | undefined>();
export const ROOT_ROUTE_TOKENS: InjectionToken<VinessRoute<any>>[] = [];
export const PARENT_ROUTE_TO_CHILD_ROUTES = new Map<InjectionToken<VinessRoute<any>>, InjectionToken<VinessRoute<any>>[]>();

export function toRouteObjects(routeTokens?: InjectionToken<VinessRoute<any>>[]): RouteObject[] {
    if (!routeTokens) {
        routeTokens = ROOT_ROUTE_TOKENS;
    }

    return routeTokens.map((token) => {
        const routeMeta = TOKEN_TO_ROUTE_META.get(token);
        const childRouteTokens = PARENT_ROUTE_TO_CHILD_ROUTES.get(token);

        let childRouteObjects: RouteObject[] = [];
        if (childRouteTokens) {
            childRouteObjects = toRouteObjects(childRouteTokens);
        }

        return {
            ...(routeMeta as any),
            // path: toFullPath(token),
            children: childRouteObjects
        };
    });
}

export function toFullPath(routeToken: InjectionToken<VinessRoute<any>>) {
    const separatedPaths: string[] = [];
    while (routeToken) {
        const route = TOKEN_TO_ROUTE_META.get(routeToken);
        const parentRouteToken = route?.parent;

        let path: string = route?.path || '';
        if (path.startsWith('/')) {
            separatedPaths.unshift(path);
            break;
        } else {
            path = `/${path}`;
        }

        separatedPaths.unshift(path);

        if (parentRouteToken) {
            routeToken = parentRouteToken;
        } else {
            break;
        }
    }

    const fullPath = separatedPaths.join('');

    return fullPath;
}

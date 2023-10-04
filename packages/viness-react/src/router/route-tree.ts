import { RouteObject, redirect } from 'react-router-dom';
import { VinessRouteInjectionToken } from './route.protocol';
import { VinessRoute } from './route';
import { SyncDescriptor } from '@viness/di';

export type RouteToken<P extends string> = VinessRouteInjectionToken<P>;

export type RouteNode<P extends string> =
    | RouteToken<P>
    | { route: RouteToken<P>; index?: boolean; children: (RouteNode<P> | RouteToken<P>)[] }
    | [RouteToken<P>, RouteToken<P>[]];

export type RouteTree = RouteNode<any>[];

function toVinessRouteProvider(token: VinessRouteInjectionToken<any>, path?: string): any {
    const args = path ? { ...token.metadata, path } : token.metadata;

    return { provide: token, useClass: new SyncDescriptor(VinessRoute, [args]) };
}

export function convertToVinessRouteProviders(tree: RouteTree, parentPath: string[] = []) {
    const routes: any[] = [];
    tree.forEach((node) => {
        if (typeof node === 'function') {
            node as RouteToken<any>;

            const metadata = node.metadata;
            const path = metadata.path as string;
            if (path.startsWith('/')) {
                const route = toVinessRouteProvider(node);
                routes.push(route);
            } else {
                const newPath = [...parentPath, path].filter(Boolean).join('/');
                const route = toVinessRouteProvider(node, newPath);
                routes.push(route);
            }
        } else if (Array.isArray(node)) {
            const [parent, children] = node;
            const newRoutes = convertToVinessRouteProviders(children, [...parentPath, parent.metadata.path]);
            routes.push(...newRoutes);
        } else {
            const { children } = node;
            const newRoutes = convertToVinessRouteProviders(children, [...parentPath, node.route.metadata.path]);
            routes.push(...newRoutes);
        }
    });

    return routes;
}

/**
 * Convert to React-Router RouterObject & Viness Route Instance
 *
 * @param tree
 * @returns
 */
export function convertToReactRoutes(tree: RouteTree): RouteObject[] {
    const routeObjects = tree.map((node) => {
        if (typeof node === 'function') {
            node as RouteToken<any>;

            const routeObject = node.metadata;

            // ref the token in route object to make finding viness route instance easier
            return { ...routeObject, token: node };
        } else if (Array.isArray(node)) {
            const [route, children] = node;
            const newChildren = convertToReactRoutes(children);
            const defaultChildRoute = {
                index: true,
                loader: () => redirect(newChildren?.[0].path || '')
            };
            return { ...route.metadata, children: [defaultChildRoute, ...newChildren] };
        } else {
            const { route, index, children } = node;
            const newChildren = convertToReactRoutes(children);
            return { ...route.metadata, index, children: newChildren };
        }
    });

    return routeObjects as RouteObject[];
}

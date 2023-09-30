import { RouteObject, redirect } from 'react-router-dom'
import { VinessRouteInjectionToken } from './route.protocol'
import { VinessRoute } from './route'
import { Injectable } from '../app'

export type RouteToken<P extends string> = VinessRouteInjectionToken<P>

export type RouteNode<P extends string> =
    | RouteToken<P>
    | { route: RouteToken<P>; index?: boolean; children: (RouteNode<P> | RouteToken<P>)[] }
    | [RouteToken<P>, RouteToken<P>[]]

export type RouteTree = RouteNode<any>[]

function toVinessRouteProvider(token: VinessRouteInjectionToken<any>): any {
    @Injectable(token)
    class NewVinessRoute extends VinessRoute<any> {}
    return NewVinessRoute
}

export function convertToVinessRouteProviders(tree: RouteTree) {
    const routes: any[] = []
    tree.forEach((node) => {
        if (typeof node === 'function') {
            node as RouteToken<any>

            const route = toVinessRouteProvider(node)
            routes.push(route)
        } else if (Array.isArray(node)) {
            const [_, children] = node
            const newRoutes = convertToReactRoutes(children)
            routes.push(...newRoutes)
        } else {
            const { children } = node
            const newRoutes = convertToReactRoutes(children)
            routes.push(...newRoutes)
        }
    })

    return routes
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
            node as RouteToken<any>

            return node.metadata
        } else if (Array.isArray(node)) {
            const [route, children] = node
            const newChildren = convertToReactRoutes(children)
            const defaultChildRoute = {
                index: true,
                loader: () => redirect(newChildren?.[0].path || '')
            }
            return { ...route.metadata, children: [defaultChildRoute, ...newChildren] }
        } else {
            const { route, index, children } = node
            const newChildren = convertToReactRoutes(children)
            return { ...route.metadata, index, children: newChildren }
        }
    })

    return routeObjects as RouteObject[]
}

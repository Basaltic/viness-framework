import { RouteObject, RouterProvider } from 'react-router-dom'
import { IVinessRoute, RouteNode, RouteItem } from './route'
import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom'
import { useResolve } from '../hooks'
import { IVinessRouter } from './router.interface'
import { VinessRouter } from './router'

export interface AppRouterProps {
    type: 'hash' | 'browser' | 'memory'
    basename?: string
    routeItems: RouteItem[]
}

/**
 * Router Component
 */
export const AppRouter = () => {
    const vinessRouter = useResolve(IVinessRouter) as VinessRouter

    // if (!vinessRouter) return <div>Router Module is not provided</div>

    // const toRouteObj = (route: IVinessRoute, item?: RouteNode): RouteObject => {
    //     return {
    //         id: route.id,
    //         path: route.path,
    //         index: item?.index,
    //         element: route.element,
    //         errorElement: route.errorElement,
    //         Component: route.Component,
    //         ErrorBoundary: route.ErrorBoundary,
    //         hasErrorBoundary: route.hasErrorBoundary,
    //         caseSensitive: route.caseSensitive
    //     }
    // }

    // const toRouteObjects = (routeNodes: RouteItem[], parentId?: any) => {
    //     return routeNodes.map((item) => {
    //         let routeId
    //         let routeObject
    //         if (typeof item === 'function') {
    //             routeId = item
    //             const route = vinessRouter.resolve(routeId)
    //             routeObject = toRouteObj(route)
    //         } else {
    //             routeId = item.id
    //             const route = vinessRouter.resolve(routeId)
    //             routeObject = toRouteObj(route, item)

    //             if (item.children && item.children.length > 0) {
    //                 routeObject.children = toRouteObjects(item.children, routeId)
    //             }
    //         }

    //         if (parentId) {
    //             vinessRouter.setParentChild(parentId, routeId)
    //         }

    //         return routeObject
    //     })
    // }

    // const routes = toRouteObjects(routeItems)

    return <RouterProvider router={vinessRouter.reactRouter} />
}

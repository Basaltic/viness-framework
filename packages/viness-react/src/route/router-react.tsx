import { useCallback, useMemo } from 'react'
import {
    createBrowserRouter,
    createHashRouter,
    createMemoryRouter,
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider
} from 'react-router-dom'
import { useAppContext } from '../app-react-context'
import { IVinessRoute } from './route'

export { Outlet, Navigate }

/**
 * Router Component
 */
export const AppRouter = () => {
    const app = useAppContext()

    const toRouteObjects = useCallback(
        (vinessRoutes: IVinessRoute[]) => {
            const routes = vinessRoutes.map((vinessRoute) => {
                const routeObj = toRouteObj(vinessRoute)

                const childRoutes = app.routes.getChildren(vinessRoute.identifier)

                if (childRoutes && childRoutes.length > 0) {
                    routeObj.children = toRouteObjects(childRoutes)
                }

                return routeObj
            })
            return routes
        },
        [app]
    )

    const router = useMemo(() => {
        const vinessRoutes = app.routes.getChildren()
        const routes = toRouteObjects(vinessRoutes)
        switch (app.config.router?.routerType) {
            case 'memory':
                return createMemoryRouter(routes)
            case 'hash':
                return createHashRouter(routes)
            case 'browser':
            default:
                return createBrowserRouter(routes)
        }
    }, [])

    return <RouterProvider router={router} />
}
const toRouteObj = (route: IVinessRoute): RouteObject => {
    return {
        id: route.id,
        path: route.path,
        element: route.element,
        errorElement: route.errorElement,
        Component: route.Component,
        ErrorBoundary: route.ErrorBoundary,
        hasErrorBoundary: route.hasErrorBoundary,
        caseSensitive: route.caseSensitive
    }
}

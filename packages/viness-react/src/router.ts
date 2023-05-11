import { ServiceIdentifier, SyncDescriptor } from '@viness/di'
import { createMemoryRouter, NavigateOptions } from 'react-router'
import { createBrowserRouter, createHashRouter, RouteObject } from 'react-router-dom'
import { servicesContainer, createDecorator } from './container'
import { IVinessAppConfig } from './app-config'
import { IVinessRoute, VinessRoute, VinessRouteObject } from './route'
import { generateId } from './utils'

type IRouter = ReturnType<typeof createHashRouter>
export type NavOption = Pick<NavigateOptions, 'state' | 'preventScrollReset'>

export const IVinessRouter = createDecorator<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    /**
     * add new route
     *
     * @param routeObj added route
     * @param parentRouteId parent route of this added route
     * @returns
     */
    addRoute(
        routeObj: VinessRouteObject,
        parentRouteId?: ServiceIdentifier<IVinessRoute>
    ): ServiceIdentifier<IVinessRoute<{}, {}>>
    /**
     * get route instance by id
     *
     * @param id
     */
    getRoute<
        P extends Record<string, string | number | boolean>,
        Q extends Record<string, string | string[]>,
        T extends IVinessRoute<P, Q>
    >(
        id: ServiceIdentifier<T>
    ): T
    /**
     * go to a specific route path
     *
     * @param to
     */
    go(to: string): Promise<void> | undefined
    /**
     * go to a specific route path with nav options
     *
     * @param to
     */
    push(to: string, option?: NavOption): Promise<void> | undefined
    /**
     * replace current route path to a specific route path with nav options
     *
     * @param to
     */
    replace(to: string, option?: NavOption): Promise<void> | undefined
    /**
     * navigate to a specific route path with full nav options
     *
     * @param to
     */
    navigate(to: string, option: NavigateOptions): Promise<void> | undefined
}

export interface VinessRouterConfig {
    routerType: 'hash' | 'browser' | 'memory'
}

export class VinessReactRouter implements IVinessRouter {
    private router?: IRouter
    private routeIdentifiers: ServiceIdentifier<IVinessRoute>[] = []
    private parentToChildren = new Map<ServiceIdentifier<IVinessRoute>, ServiceIdentifier<IVinessRoute>[]>()
    private childToParent = new Map<ServiceIdentifier<IVinessRoute>, ServiceIdentifier<IVinessRoute>>()

    constructor(@IVinessAppConfig private config: IVinessAppConfig) {}

    go(to: string): Promise<void> | undefined {
        return this.navigate(to)
    }

    push(to: string, option: NavOption = {}): Promise<void> | undefined {
        return this.navigate(to, option)
    }

    replace(to: string, option: NavOption = {}): Promise<void> | undefined {
        return this.navigate(to, { replace: true, ...option })
    }

    navigate(to: string, option?: NavigateOptions) {
        return this.router?.navigate(to, option)
    }

    addRoute(routeObj: VinessRouteObject, parentRouteId?: ServiceIdentifier<IVinessRoute>) {
        const id = `VinessRoute_${routeObj.id || generateId()}`
        const IRouteDecorator = createDecorator<IVinessRoute>(id)

        const descriptor = new SyncDescriptor(VinessRoute, [routeObj, id, parentRouteId, this], true)
        servicesContainer.register(IRouteDecorator, descriptor)
        this._addRoute(IRouteDecorator, parentRouteId)

        return IRouteDecorator
    }

    getRoute<
        P extends Record<string, string | number | boolean>,
        Q extends Record<string, string | string[]>,
        T extends IVinessRoute<P, Q>
    >(id: ServiceIdentifier<T>): T {
        return servicesContainer.get<T>(id) as T
    }

    private _addRoute(routeId: ServiceIdentifier<IVinessRoute>, parentRouteId?: ServiceIdentifier<IVinessRoute>) {
        if (parentRouteId) {
            const children = this.parentToChildren.get(parentRouteId)
            if (children) {
                children.push(routeId)
            } else {
                this.parentToChildren.set(parentRouteId, [routeId])
            }

            this.childToParent.set(routeId, parentRouteId)
        } else {
            this.parentToChildren.set(routeId, [])
            this.routeIdentifiers.push(routeId)
        }
    }

    private _getInnerRouter() {
        if (!this.router) {
            const routes = this._getRouteObjects()
            switch (this.config.router?.routerType) {
                case 'memory':
                    this.router = createMemoryRouter(routes)
                    break
                case 'hash':
                    this.router = createHashRouter(routes)
                    break
                case 'browser':
                default:
                    this.router = createBrowserRouter(routes)
            }
        }

        return this.router
    }

    private _getRouteObjects() {
        const routes = this._toRouteObjects(this.routeIdentifiers)
        return routes
    }

    private _toRouteObjects(ids: ServiceIdentifier<IVinessRoute>[]) {
        const routes = ids.map((id) => {
            const childrenIds = this.parentToChildren.get(id)
            const route = servicesContainer.get(id)
            const routeObj = this._toRouteObj(route)

            if (childrenIds) {
                routeObj.children = this._toRouteObjects(childrenIds)
            }

            return routeObj
        })
        return routes
    }

    /**
     * Convert to React-Router Route Object
     */
    private _toRouteObj(route: IVinessRoute): RouteObject {
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
}

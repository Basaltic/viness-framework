import { createDecorator, IInstantiationService, InstantiationService, ServiceIdentifier } from '@viness/di'
import { createMemoryRouter, NavigateOptions } from 'react-router'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import { IVinessAppConfig } from './app-config'
import { VinessRoute } from './route'

type IRouter = ReturnType<typeof createHashRouter>

export const IVinessRouter = createDecorator<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    addRoute(routeId: ServiceIdentifier<VinessRoute>, parentRouteId?: ServiceIdentifier<VinessRoute>): void
    navigate(to: string, option: NavigateOptions): Promise<void> | undefined
}

export interface VinessRouterConfig {
    routerType: 'hash' | 'browser' | 'memory'
}

export class VinessRouter implements IVinessRouter {
    private router?: IRouter
    private routeIdentifiers: ServiceIdentifier<VinessRoute>[] = []
    private parentToChildren = new Map<ServiceIdentifier<VinessRoute>, ServiceIdentifier<VinessRoute>[]>()
    private childToParent = new Map<ServiceIdentifier<VinessRoute>, ServiceIdentifier<VinessRoute>>()

    constructor(
        @IInstantiationService private instantiationService: InstantiationService,
        @IVinessAppConfig private config: IVinessAppConfig
    ) {}

    getParentRoute(routeId: ServiceIdentifier<VinessRoute>) {
        const parentRouteId = this.childToParent.get(routeId)
        if (parentRouteId) {
            return this.instantiationService.invokeFunction((a) => a.get(parentRouteId))
        }
    }

    addRoute(routeId: ServiceIdentifier<VinessRoute>, parentRouteId?: ServiceIdentifier<VinessRoute>) {
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

    navigate(to: string, option: NavigateOptions) {
        return this.router?.navigate(to, option)
    }

    _getInnerRouter() {
        if (!this.router) {
            const routes = this.getRouteObjects()
            console.log(routes)
            console.log(this.parentToChildren)
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

    private getRouteObjects() {
        const routes = this.toRouteObjects(this.routeIdentifiers)
        return routes
    }

    private toRouteObjects(ids: ServiceIdentifier<VinessRoute>[]) {
        const routes = ids.map((id) => {
            const childrenIds = this.parentToChildren.get(id)
            const route = this.instantiationService.invokeFunction((accessor) => accessor.get(id))
            const routeObj = route._toRouteObj()

            if (childrenIds) {
                routeObj.children = this.toRouteObjects(childrenIds)
            }

            return routeObj
        })
        return routes
    }
}

import { createDecorator, IInstantiationService, InstantiationService, ServiceIdentifier } from '@viness/di'
import { createMemoryRouter, NavigateOptions, UNSAFE_NavigationContext } from 'react-router'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import { IVinessAppConfig } from './app-config'
import { VinessRoute } from './route'

type IRouter = ReturnType<typeof createHashRouter>

export const IVinessRouter = createDecorator<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    _setInnerRouter(router: IRouter): void
    _getInnerRouter(): IRouter | undefined
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

    constructor(
        @IInstantiationService private instantiationService: InstantiationService,
        @IVinessAppConfig private config: IVinessAppConfig
    ) {}

    _setInnerRouter(router: IRouter) {
        this.router = router
    }

    _getInnerRouter() {
        if (!this.router) {
            const routes = this.getRouteObjects()
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

    addRoute(routeId: ServiceIdentifier<VinessRoute>, parentRouteId?: ServiceIdentifier<VinessRoute>) {
        this.routeIdentifiers.push(routeId)
    }

    navigate(to: string, option: NavigateOptions) {
        return this.router?.navigate(to, option)
    }

    private getRouteObjects() {
        const routes = this.routeIdentifiers.map((id) =>
            this.instantiationService.invokeFunction((accessor) => accessor.get(id)._toRouteObj())
        )
        return routes
    }
}

import { createDecorator, ServiceIdentifier } from '@viness/di'
import { NavigateOptions } from 'react-router'
import { createHashRouter } from 'react-router-dom'
import { VinessRoute } from './route'

type IRouter = ReturnType<typeof createHashRouter>

export const IVinessRouter = createDecorator<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    _setRouter(router: IRouter): void
    _getRouter(): IRouter | undefined
    addRoute(routeId: ServiceIdentifier<VinessRoute>, route: VinessRoute): void
    getRoutes(): VinessRoute[]
    navigate(to: string, option: NavigateOptions): Promise<void> | undefined
}

export class VinessRouter implements IVinessRouter {
    private router?: IRouter
    private routeIdentifiers: ServiceIdentifier<VinessRoute>[] = []
    private routes: VinessRoute[] = []

    _setRouter(router: IRouter) {
        this.router = router
    }

    _getRouter() {
        if (!this.router) {
            // TODO: add configuration to support other type of router: brower, memory,
            this.router = createHashRouter(this.routes)
        }

        return this.router
    }

    addRoute(routeId: ServiceIdentifier<VinessRoute>, route: VinessRoute) {
        this.routes.push(route)
        this.routeIdentifiers.push(routeId)
    }

    getRoutes() {
        return this.routes
    }

    navigate(to: string, option: NavigateOptions) {
        return this.router?.navigate(to, option)
    }
}

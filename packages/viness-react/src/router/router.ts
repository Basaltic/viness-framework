import { NavigateFunction, RouteObject, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom'
import { IVinessRouter, ReactRouter } from './router.protocol'
import { PathParam } from './types'

export type RouterParams = {
    type: 'hash' | 'browser' | 'memory'
    routes: RouteObject[]
    basename?: string
}

/**
 * keep state of routes
 */
export class VinessRouter implements IVinessRouter {
    reactRouter: ReactRouter

    constructor(configs: RouterParams) {
        const { type, routes, basename } = configs

        let router
        switch (type) {
            case 'memory':
                router = createMemoryRouter(routes as any, { basename })
            case 'hash':
                router = createHashRouter(routes as any, { basename })
            case 'browser':
            default:
                router = createBrowserRouter(routes as any, { basename })
        }

        this.reactRouter = router
    }

    get state() {
        return this.reactRouter.state
    }

    get navigate(): NavigateFunction {
        return this.reactRouter.navigate
    }

    getParams<Path extends string>() {
        const router = this.reactRouter
        const matchesLength = router.state.matches.length
        const match = router.state.matches[matchesLength - 1]
        return match.params as { [key in PathParam<Path>]: string | null }
    }
}

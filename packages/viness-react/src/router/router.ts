import { NavigateFunction, createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom'
import { IVinessRouter, ReactRouter, RouterConfig } from './router.protocol'
import { PathParam } from './route.protocol'

/**
 * keep state of routes
 */
export class VinessRouter implements IVinessRouter {
    config: RouterConfig
    reactRouter: ReactRouter

    constructor(configs: RouterConfig) {
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

        this.config = configs
        this.reactRouter = router
    }

    // configure(config: RouterConfig) {
    //     const { type, routes, basename } = config

    //     let router
    //     switch (type) {
    //         case 'memory':
    //             router = createMemoryRouter(routes as any, { basename })
    //         case 'hash':
    //             router = createHashRouter(routes as any, { basename })
    //         case 'browser':
    //         default:
    //             router = createBrowserRouter(routes as any, { basename })
    //     }

    //     this.config = config
    //     this.reactRouter = router
    // }

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

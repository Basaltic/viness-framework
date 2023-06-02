import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom'
import { IVinessRouter, RouterConfig } from './router.interface'
import { NavigateFunction } from './types'

export type ReactRouter = ReturnType<typeof createBrowserRouter>

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
                router = createMemoryRouter(routes, { basename })
            case 'hash':
                router = createHashRouter(routes, { basename })
            case 'browser':
            default:
                router = createBrowserRouter(routes, { basename })
        }

        this.config = configs
        this.reactRouter = router
    }

    /**
     * navigate to any path
     *
     * @param to
     * @param opts
     * @returns
     */
    navigate: NavigateFunction = () => {}
}

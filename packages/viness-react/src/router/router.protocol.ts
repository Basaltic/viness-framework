import { createBrowserRouter, NavigateFunction } from 'react-router-dom'
import { createToken } from '../token'
import { RouteTree } from './route-tree'
import { PathParam } from './types'
import { IVinessRoute } from './route.protocol'

export type ReactRouter = ReturnType<typeof createBrowserRouter>

export const IVinessRouter = createToken<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    state: ReactRouter['state']

    /**
     * navigate to any path
     *
     * @param to
     * @param opts
     * @returns
     */
    navigate: NavigateFunction

    /**
     * get current matched path params
     */
    getParams<Path extends string>(): { [key in PathParam<Path>]: string | null }

    /**
     * get current matched route instance
     */
    getRoute<Path extends string = any>(): IVinessRoute<Path>
}

export interface RouterConfig {
    type: 'hash' | 'browser' | 'memory'
    routeTree: RouteTree
    basename?: string
}

import { createBrowserRouter, NavigateFunction } from 'react-router-dom'
import { createToken } from '../token'
import { IVinessRoute, PathParam } from './route.protocol'
import { RouteTree } from './route-tree'

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
}

export interface RouterConfig {
    type: 'hash' | 'browser' | 'memory'
    routes: IVinessRoute<any>[]
    /**
     *
     */
    routeTree?: RouteTree
    basename?: string
}

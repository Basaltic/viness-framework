import { NavigateFunction, RouteObject } from 'react-router-dom'
import { createDecorator } from '../decorator'
import { VinessRouteObject, IVinessRoute, VinessRouteIdentifer, RouteItem } from './route'

export const IVinessRouter = createDecorator<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    // readonly config: RouterConfig
    // /**
    //  * add new route
    //  *
    //  * @param routeObj added route
    //  * @param parentRouteId parent route of this added route
    //  * @returns
    //  */
    // register(routeObj: VinessRouteObject, parentRouteId?: VinessRouteIdentifer): VinessRouteIdentifer
    // /**
    //  * get route instance by id
    //  *
    //  * @param id
    //  */
    // resolve<P extends Record<string, string | number | boolean>, Q extends Record<string, string | string[]>>(
    //     id: VinessRouteIdentifer<P, Q>
    // ): IVinessRoute<P, Q>
    // /**
    //  * get children routes by parent id
    //  *
    //  * @param parentId
    //  */
    // getChildren(parentId?: VinessRouteIdentifer): IVinessRoute[]
    // /**
    //  * get parent route by child id
    //  * @param child
    //  */
    // getParent(child: VinessRouteIdentifer): IVinessRoute | undefined
    // setParentChild(parentId: VinessRouteIdentifer, childId: VinessRouteIdentifer): void
    // /**
    //  * navigate to any path
    //  *
    //  * @param to
    //  * @param opts
    //  * @returns
    //  */
    // navigate: NavigateFunction
}

export interface RouterConfig {
    type: 'hash' | 'browser' | 'memory'
    routes: RouteObject[]
    basename?: string
}

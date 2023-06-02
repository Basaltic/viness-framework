import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom'
import { Container, SyncDescriptor } from '@viness/di'
import { createDecorator } from '../decorator'
import { generateId } from '../utils'
import { VinessRouteObject, IVinessRoute, VinessRoute, VinessRouteIdentifer, RouteItem } from './route'
import { IVinessRouter, RouterConfig } from './router.interface'
import { NavigateFunction } from './types'

export type ReactRouter = ReturnType<typeof createBrowserRouter>

/**
 * keep state of routes
 */
export class VinessRouter implements IVinessRouter {
    // routeIdentifiers: VinessRouteIdentifer[] = []
    // parentToChildren = new Map<VinessRouteIdentifer, VinessRouteIdentifer[]>()
    // childToParent = new Map<VinessRouteIdentifer, VinessRouteIdentifer>()
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

    // register(routeObj: VinessRouteObject) {
    //     const id = `VinessRoute_${routeObj.id || generateId()}`
    //     const IRouteIdentifier = createDecorator(id) as VinessRouteIdentifer

    //     const descriptor = new SyncDescriptor(VinessRoute, [routeObj, IRouteIdentifier, this], true)
    //     this.container.register(IRouteIdentifier, descriptor)

    //     this.parentToChildren.set(IRouteIdentifier, [])
    //     this.routeIdentifiers.push(IRouteIdentifier)

    //     return IRouteIdentifier
    // }

    // resolve<P extends Record<string, string | number | boolean>, Q extends Record<string, string | string[]>>(
    //     id: VinessRouteIdentifer<P, Q>
    // ): IVinessRoute<P, Q> {
    //     return this.container.resolve(id) as IVinessRoute<P, Q>
    // }

    // getChildren(parentId?: VinessRouteIdentifer): IVinessRoute[] {
    //     const childIds = parentId ? this.parentToChildren.get(parentId) : this.routeIdentifiers
    //     if (childIds) {
    //         const children = childIds.map((id) => this.resolve(id))
    //         return children
    //     }
    //     return []
    // }

    // getParent(child: VinessRouteIdentifer): IVinessRoute | undefined {
    //     const parent = this.childToParent.get(child)
    //     if (parent) {
    //         return this.resolve(parent)
    //     }
    // }

    // setParentChild(parentId: VinessRouteIdentifer, childId: VinessRouteIdentifer) {
    //     const children = this.parentToChildren.get(parentId)
    //     if (children) {
    //         children.push(childId)
    //     } else {
    //         this.parentToChildren.set(parentId, [childId])
    //     }

    //     this.childToParent.set(childId, parentId)
    // }
}

import { SyncDescriptor } from '@viness/di'
import { NavigateOptions } from 'react-router'
import { servicesContainer } from '../container'
import { createIdentifier } from '../identifier'
import { generateId } from '../utils'
import { VinessRouteObject, IVinessRoute, VinessRoute } from './route'
import { createRouteIdentifer, VinessRouteIdentifer } from './route-identifier'
import { useRoute } from './route-hooks'

export type NavOption = Pick<NavigateOptions, 'state' | 'preventScrollReset'>

export const IVinessRouter = createIdentifier<IVinessRoutes>('IVinessRouter')

export interface IVinessRoutes {
    /**
     * add new route
     *
     * @param routeObj added route
     * @param parentRouteId parent route of this added route
     * @returns
     */
    add(
        routeObj: VinessRouteObject,
        parentRouteId?: VinessRouteIdentifer<IVinessRoute>
    ): VinessRouteIdentifer<IVinessRoute<{}, {}>>
    /**
     * get route instance by id
     *
     * @param id
     */
    get<
        P extends Record<string, string | number | boolean>,
        Q extends Record<string, string | string[]>,
        T extends IVinessRoute<P, Q>
    >(
        id: VinessRouteIdentifer<T>
    ): T

    /**
     * get children routes by parent id
     *
     * @param parentId
     */
    getChildren<T extends IVinessRoute>(parentId?: VinessRouteIdentifer<T>): IVinessRoute[]
}

export interface VinessRouterConfig {
    routerType: 'hash' | 'browser' | 'memory'
}

export class VinessReactRoutes implements IVinessRoutes {
    private routeIdentifiers: VinessRouteIdentifer<IVinessRoute>[] = []
    private parentToChildren = new Map<VinessRouteIdentifer<IVinessRoute>, VinessRouteIdentifer<IVinessRoute>[]>()
    private childToParent = new Map<VinessRouteIdentifer<IVinessRoute>, VinessRouteIdentifer<IVinessRoute>>()

    add(routeObj: VinessRouteObject, parentRouteId?: VinessRouteIdentifer<IVinessRoute>) {
        const id = `VinessRoute_${routeObj.id || generateId()}`
        const IRouteDecorator = createRouteIdentifer<IVinessRoute>(id)

        IRouteDecorator.use = () => useRoute(IRouteDecorator)

        IRouteDecorator.addChild = (routeObj: VinessRouteObject) => {
            return this.add(routeObj, parentRouteId)
        }

        const descriptor = new SyncDescriptor(VinessRoute, [routeObj, id, parentRouteId, this], true)
        servicesContainer.register(IRouteDecorator, descriptor)
        this._addRoute(IRouteDecorator, parentRouteId)

        return IRouteDecorator
    }

    get<
        P extends Record<string, string | number | boolean>,
        Q extends Record<string, string | string[]>,
        T extends IVinessRoute<P, Q>
    >(id: VinessRouteIdentifer<T>): T {
        return servicesContainer.get<T>(id) as T
    }

    getChildren<T extends IVinessRoute>(parentId?: VinessRouteIdentifer<T>): IVinessRoute[] {
        const childIds = parentId ? this.parentToChildren.get(parentId) : this.routeIdentifiers
        if (childIds) {
            const children = childIds.map((id) => this.get(id))
            return children
        }
        return []
    }

    private _addRoute(routeId: VinessRouteIdentifer<IVinessRoute>, parentRouteId?: VinessRouteIdentifer<IVinessRoute>) {
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
}

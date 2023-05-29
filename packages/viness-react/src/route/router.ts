import { SyncDescriptor } from '@viness/di'
import { servicesContainer } from '../app/container'
import { createIdentifier } from '../identifier'
import { generateId } from '../utils'
import { VinessRouteObject, IVinessRoute, VinessRoute, VinessRouteIdentifer } from './route'
import { NavigateFunction } from './types'

export const IVinessRouter = createIdentifier<IVinessRouter>('IVinessRouter')

export interface IVinessRouter {
    /**
     * add new route
     *
     * @param routeObj added route
     * @param parentRouteId parent route of this added route
     * @returns
     */
    register(routeObj: VinessRouteObject, parentRouteId?: VinessRouteIdentifer): VinessRouteIdentifer
    /**
     * get route instance by id
     *
     * @param id
     */
    resolve<P extends Record<string, string | number | boolean>, Q extends Record<string, string | string[]>>(
        id: VinessRouteIdentifer<P, Q>
    ): IVinessRoute<P, Q>

    /**
     * get children routes by parent id
     *
     * @param parentId
     */
    getChildren(parentId?: VinessRouteIdentifer): IVinessRoute[]

    /**
     * get parent route by child id
     * @param child
     */
    getParent(child: VinessRouteIdentifer): IVinessRoute | undefined
}

/**
 * keep state of routes
 */
export class VinessRouter implements IVinessRouter {
    routeIdentifiers: VinessRouteIdentifer[] = []
    parentToChildren = new Map<VinessRouteIdentifer, VinessRouteIdentifer[]>()
    childToParent = new Map<VinessRouteIdentifer, VinessRouteIdentifer>()

    /**
     * navigate to any path
     *
     * @param to
     * @param opts
     * @returns
     */
    navigate: NavigateFunction = () => {}

    register(routeObj: VinessRouteObject) {
        const id = `VinessRoute_${routeObj.id || generateId()}`
        const IRouteIdentifier = createIdentifier(id) as VinessRouteIdentifer

        IRouteIdentifier.resolve = () => IRouteIdentifier.resolve()
        IRouteIdentifier.useResolve = () => IRouteIdentifier.useResolve()

        const descriptor = new SyncDescriptor(VinessRoute, [routeObj, IRouteIdentifier, this], true)
        servicesContainer.register(IRouteIdentifier, descriptor)

        this.parentToChildren.set(IRouteIdentifier, [])
        this.routeIdentifiers.push(IRouteIdentifier)

        return IRouteIdentifier
    }

    resolve<P extends Record<string, string | number | boolean>, Q extends Record<string, string | string[]>>(
        id: VinessRouteIdentifer<P, Q>
    ): IVinessRoute<P, Q> {
        return servicesContainer.resolve(id) as IVinessRoute<P, Q>
    }

    getChildren(parentId?: VinessRouteIdentifer): IVinessRoute[] {
        const childIds = parentId ? this.parentToChildren.get(parentId) : this.routeIdentifiers
        if (childIds) {
            const children = childIds.map((id) => this.resolve(id))
            return children
        }
        return []
    }

    getParent(child: VinessRouteIdentifer): IVinessRoute | undefined {
        const parent = this.childToParent.get(child)
        if (parent) {
            return this.resolve(parent)
        }
    }

    setParentChild(parentId: VinessRouteIdentifer, childId: VinessRouteIdentifer) {
        const children = this.parentToChildren.get(parentId)
        if (children) {
            children.push(childId)
        } else {
            this.parentToChildren.set(parentId, [childId])
        }

        this.childToParent.set(childId, parentId)
    }
}

export const vinessRouter = new VinessRouter()

import { createDecorator, ServiceIdentifier } from '@viness/di'
import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useNavigate, useLocation, useParams, Outlet } from 'react-router-dom'
import joinPath from './utils'
import { nanoid } from 'nanoid'
import { IVinessRouter } from './router'

export { useNavigate, useLocation, useParams, Outlet }

export interface VinessRouteObject extends Omit<RouteObject, 'children'> {
    children?: VinessRoute[]
}

/**
 * Encapsulate the 'RouteObject' in 'react-route-dom'
 * - Support Param & Query Defination
 */
export class VinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> implements VinessRouteObject
{
    id?: string
    path: string
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean

    children?: VinessRoute[]
    parent?: VinessRoute

    router

    constructor(params: VinessRouteObject, router: IVinessRouter) {
        const { id, path, element, children, errorElement, Component, ErrorBoundary, hasErrorBoundary, caseSensitive } =
            params

        this.id = id
        this.path = path || ''
        this.element = element
        this.children = children
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive

        this.router = router

        if (children) this.addChildren(...children)
    }

    /**
     * Add child routes to this route.
     *
     * @param {...VinessRoute[]} children
     */
    addChildren(...children: VinessRoute[]) {
        if (children) {
            this.children = children
            for (const child of children) {
                child.parent = this
            }
        }
    }

    /**
     * Get the full path recurse to the top
     */
    getFullPath(): string {
        const pathList = []
        let current: VinessRoute | undefined = this
        while (current) {
            pathList.unshift(current.path)
            current = current.parent
        }

        return joinPath(...pathList)
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string {
        const { params = {}, queries } = option || {}

        let fullPath = this.getFullPath()
        console.log('full path ===> ', fullPath)

        const path = generatePath(fullPath, params)

        if (queries) {
            const searchParams = new URLSearchParams()
            return `${path}?${searchParams.toString()}`
        }

        return path
    }

    matchPath(path: string) {
        return matchPath({ path: this.path }, path)
    }

    /**
     *
     */
    isMatch(path: string): boolean {
        const isMatch = Boolean(matchPath({ path: this.path }, path))
        return isMatch
    }

    useParams() {
        return useParams() as Params
    }
}

/**
 * Create Route Identifier & Route Class
 *
 * @param routeObject
 * @returns
 */
export function createRoute(routeObject: VinessRouteObject) {
    class Route extends VinessRoute {
        constructor(@IVinessRouter router: IVinessRouter) {
            super(routeObject, router)
        }
    }

    const id = `VinessRoute_${routeObject.id || nanoid(8)}`
    const IRouteDecorator = createDecorator<Route>(id)
    return [IRouteDecorator, Route] as [ServiceIdentifier<Route>, typeof Route]
}

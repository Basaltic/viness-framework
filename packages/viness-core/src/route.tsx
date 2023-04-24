import { createDecorator, ServiceIdentifier } from '@viness/di'
import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useParams } from 'react-router-dom'
import joinPath from './utils'
import { generateId } from './id'
import { IVinessRouter, VinessRouter } from './router'

export interface VinessRouteObject extends Omit<RouteObject, 'children'> {}

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

    router: VinessRouter
    identifier: ServiceIdentifier<VinessRoute>

    constructor(params: VinessRouteObject, identifier: ServiceIdentifier<VinessRoute>, router: VinessRouter) {
        const { id, path, element, errorElement, Component, ErrorBoundary, hasErrorBoundary, caseSensitive } = params

        this.id = id || identifier.toString()
        this.path = path || ''
        this.element = element
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive

        this.router = router
        this.identifier = identifier
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string {
        const { params = {}, queries } = option || {}

        const fullPath = this.getFullPath()
        const path = generatePath(fullPath, params)

        if (queries) {
            const searchParams = new URLSearchParams()
            return `${path}?${searchParams.toString()}`
        }

        return path
    }

    /**
     *
     * @param {string} path
     * @returns
     */
    matchPath(path: string) {
        return matchPath({ path: this.path }, path)
    }

    /**
     * Check if current path is matched to this route's path
     */
    isMatch(path: string): boolean {
        const isMatch = Boolean(matchPath({ path: this.path }, path))
        return isMatch
    }

    useParams() {
        return useParams() as Params
    }

    /**
     * Get the full path recurse to the parent
     */
    getFullPath(): string {
        const pathList = [this.path]
        let parentRoute = this.router.getParentRoute(this.identifier)
        while (parentRoute) {
            pathList.unshift(parentRoute.path)
            parentRoute = this.router.getParentRoute(parentRoute.identifier)
        }

        return joinPath(...pathList)
    }

    /**
     * Convert to React-Router Object
     */
    _toRouteObj(): RouteObject {
        return {
            id: this.id,
            path: this.path,
            element: this.element,
            errorElement: this.errorElement,
            Component: this.Component,
            ErrorBoundary: this.ErrorBoundary,
            hasErrorBoundary: this.hasErrorBoundary,
            caseSensitive: this.caseSensitive
        }
    }
}

/**
 * Create Route Identifier & Route Class
 *
 * @param routeObject
 * @returns
 */
export function createRoute(routeObject: VinessRouteObject) {
    const id = `VinessRoute_${routeObject.id || generateId()}`
    const IRouteDecorator = createDecorator<Route>(id)

    class Route extends VinessRoute {
        constructor(@IVinessRouter router: VinessRouter) {
            super(routeObject, IRouteDecorator, router)
        }
    }

    return [IRouteDecorator, Route] as [ServiceIdentifier<Route>, typeof Route]
}

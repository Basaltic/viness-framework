import { createDecorator, ServiceIdentifier } from '@viness/di'
import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useParams } from 'react-router-dom'
import joinPath from './utils'
import { IVinessRouter } from './router'
import { generateId } from './id'

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

    constructor(params: VinessRouteObject) {
        const { id, path, element, children, errorElement, Component, ErrorBoundary, hasErrorBoundary, caseSensitive } =
            params

        this.id = id || generateId()
        this.path = path || ''
        this.element = element
        this.children = children
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive

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
        const pathList = []
        let current: VinessRoute | undefined = this
        while (current) {
            pathList.unshift(current.path)
            current = current.parent
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
            caseSensitive: this.caseSensitive,
            children: this.children?.map((c) => c._toRouteObj())
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
    class Route extends VinessRoute {
        constructor(@IVinessRouter router: IVinessRouter) {
            super(routeObject)
        }
    }

    const id = `VinessRoute_${routeObject.id || generateId()}`
    const IRouteDecorator = createDecorator<Route>(id)
    return [IRouteDecorator, Route] as [ServiceIdentifier<Route>, typeof Route]
}

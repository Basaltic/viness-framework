import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useNavigate, useLocation, useParams } from 'react-router-dom'

export { useNavigate, useLocation, useParams }

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
    children?: VinessRoute[]
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean

    constructor(params: VinessRouteObject) {
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
    }

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    toString(option?: { params?: Params; queries?: Queries }) {
        const { params = {}, queries } = option || {}

        const path = generatePath(this.path, params)

        if (queries) {
            const searchParams = new URLSearchParams()
            return `${path}?${searchParams.toString()}`
        }

        return path
    }

    /**
     *
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
 * Create A Route Object
 *
 * @param routeObject
 * @returns
 */
export function createRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | number | boolean> = {}
>(routeObject: VinessRouteObject) {
    return new VinessRoute(routeObject)
}

import { ReactNode } from 'react'
import { RouteObject, generatePath, matchPath, useParams, type PathMatch, NavigateFunction } from 'react-router-dom'
import { joinPath } from '../utils'
import { VinessRouteIdentifer } from './route-identifier'
import { IVinessRoutes, NavOption } from './routes'

export interface VinessRouteObject extends Omit<RouteObject, 'children'> {
    /**
     * Whether this route can be access for everyone
     */
    isPublic?: boolean
    /**
     * Roles needed to access this route
     */
    neededRoles?: string[]
}

export interface IVinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> extends VinessRouteObject {
    readonly identifier: VinessRouteIdentifer<IVinessRoute>
    readonly parentIdentifier: VinessRouteIdentifer<IVinessRoute>
    /**
     * navigate to any path
     *
     * @param to
     * @param opts
     * @returns
     */
    navigate: NavigateFunction

    /**
     * Go tho this route path
     *
     * @param option
     */
    go(config?: { params?: Params; queries?: Queries }): void

    /**
     * Push this route path to the history stack with state
     */
    push(config?: { params?: Params; queries?: Queries }, options?: NavOption): void

    /**
     * Replace to this route path
     */
    replace(config?: { params?: Params; queries?: Queries }, options?: NavOption): void

    /**
     * Get the full path recurse to the parent
     */
    getFullPath(): string

    /**
     * Get tha path string
     *
     * @param option
     * @returns
     */
    generatePath(option?: { params?: Params; queries?: Queries }): string

    /**
     *
     * @param {string} path
     * @returns
     */
    matchPath(path: string): PathMatch<string> | null
    /**
     * Check if current path is matched to this route's path
     */
    isMatch(path: string): boolean

    /**
     * React hook to get current path params in the react component
     */
    useParams(): Params
}

/**
 * Route
 */
export class VinessRoute<
    Params extends Record<string, string | number | boolean> = {},
    Queries extends Record<string, string | string[]> = {}
> implements IVinessRoute<Params, Queries>
{
    id?: string
    path: string
    element: ReactNode
    errorElement?: React.ReactNode | null
    Component?: React.ComponentType | null
    ErrorBoundary?: React.ComponentType | null
    hasErrorBoundary?: boolean
    caseSensitive?: boolean

    // auth related
    isPublic?: boolean
    neededRoles?: string[]

    readonly routes: IVinessRoutes
    readonly identifier: VinessRouteIdentifer<IVinessRoute>
    readonly parentIdentifier: VinessRouteIdentifer<IVinessRoute>

    navigate!: NavigateFunction

    constructor(
        params: VinessRouteObject,
        identifier: VinessRouteIdentifer<IVinessRoute>,
        parentIdentifier: VinessRouteIdentifer<IVinessRoute>,
        routes: IVinessRoutes
    ) {
        const {
            id,
            path,
            element,
            errorElement,
            Component,
            ErrorBoundary,
            hasErrorBoundary,
            caseSensitive,
            isPublic,
            neededRoles
        } = params

        this.id = id || identifier.toString()
        this.path = path || ''
        this.element = element
        this.errorElement = errorElement
        this.Component = Component
        this.ErrorBoundary = ErrorBoundary
        this.hasErrorBoundary = hasErrorBoundary
        this.caseSensitive = caseSensitive
        this.isPublic = isPublic
        this.neededRoles = neededRoles

        this.routes = routes
        this.identifier = identifier
        this.parentIdentifier = parentIdentifier

        this.navigate = () => {}
    }

    /**
     * Go tho this route path
     *
     * @param option
     */
    go(config?: { params?: Params; queries?: Queries }) {
        const path = this.generatePath(config)
        return this.navigate(path)
    }

    /**
     * Push this route path to the history stack with state
     */
    push(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const path = this.generatePath(config)
        return this.navigate(path, options)
    }

    /**
     * Replace to this route path
     */
    replace(config?: { params?: Params; queries?: Queries }, options?: NavOption) {
        const path = this.generatePath(config)
        return this.navigate(path, { ...options, replace: true })
    }

    /**
     * Get the full path recurse to the parent
     */
    getFullPath(): string {
        if (this.parentIdentifier) {
            const parentRoute = this.routes.get(this.parentIdentifier)
            const parentPath = parentRoute.getFullPath()
            return joinPath(parentPath, this.path)
        } else {
            return this.path
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
            const searchParams = new URLSearchParams(queries as any)
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

    /**
     * React hook to get current path params in the react component
     */
    useParams() {
        return useParams() as Params
    }
}